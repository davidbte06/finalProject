const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllTvshows = async (req, res) => {
    try {
        //#swagger.tags=['Tvshows']
        const result = await mongodb.getDatabase().db().collection('tvshows').find();
        const tvshows = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tvshows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingleTvshows = async (req, res) => {
    try {
        //#swagger.tags=['Tvshows']
        const tvshowsId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('tvshows').find({ _id: tvshowsId });
        const tvshows = await result.toArray();
        if (tvshows.length === 0) {
            res.status(404).json({ error: 'tvshows not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(tvshows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const postTvshows = async (req, res) => {
    try {
        //#swagger.tags=['Tvshows']
        const tvshow = {
            TITLE: req.body.title,
            GENRE: req.body.genre,
            SEASONS: req.body.seasons,
            CREATOR: req.body.creator,
            CAST: req.body.cast,
            RATING: req.body.rating
        };
        const response = await mongodb.getDatabase().db().collection('tvshows').insertOne(tvshow);
        if (response.acknowledged) {
            res.status(201).send(response);
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the tvshows entry.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const putTvshows = async (req, res) => {
    try {
        //#swagger.tags=['Tvshows']
        const tvshowId = new ObjectId(req.params.id);
        const tvshow = {
            TITLE: req.body.title,
            GENRE: req.body.genre,
            SEASONS: req.body.seasons,
            CREATOR: req.body.creator,
            CAST: req.body.cast,
            RATING: req.body.rating
        };
        const response = await mongodb.getDatabase().db().collection('tvshows').replaceOne({ _id: tvshowId }, tvshow);
        if (response.modifiedCount > 0) {
            res.status(204).send(response);
        } else {
            res.status(400).json("Invalid ID entered. Please try again");
        }
    } catch (error) {
        res.status(500).json(response.error || "An error occurred. Please try again");
    }
};

const deleteTvshows = async (req, res) => {
    try {
        //#swagger.tags=['Tvshows']
        const tvshowId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('tvshows').deleteOne({ _id: tvshowId });
        if (response.deletedCount > 0) {
            res.status(200).send(response);
        } else {
            res.status(500).json({ error: 'Some error occurred while deleting the program entry.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTvshows,
    getSingleTvshows,
    postTvshows,
    putTvshows,
    deleteTvshows,
};