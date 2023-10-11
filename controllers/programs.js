const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllProgram = async (req, res) => {
    try {
        //#swagger.tags=['Program']
        const result = await mongodb.getDatabase().db().collection('programs').find();
        const programs = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['Program']
        const programsId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('programs').find({ _id: programsId });
        const programs = await result.toArray();
        if (programs.length === 0) {
            res.status(404).json({ error: 'programs not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(programs[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const postProgram = async (req, res) => {
    try {
        //#swagger.tags=['Program']
        const program = {
            TITLE: req.body.title,
            GENRE: req.body.genre,
            SEASONS: req.body.seasons,
            CREATOR: req.body.creator,
            CAST: req.body.cast,
            RATING: req.body.rating
        };
        const response = await mongodb.getDatabase().db().collection('programs').insertOne(program);
        if (response.acknowledged) {
            res.status(201).send(response);
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the program entry.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const putProgram = async (req, res) => {
    try {
        //#swagger.tags=['Program']
        const programId = new ObjectId(req.params.id);
        const program = {
            TITLE: req.body.title,
            GENRE: req.body.genre,
            SEASONS: req.body.seasons,
            CREATOR: req.body.creator,
            CAST: req.body.cast,
            RATING: req.body.rating
        };
        const response = await mongodb.getDatabase().db().collection('programs').replaceOne({ _id: programId }, program);
        if (response.modifiedCount > 0) {
            res.status(204).send(response);
        } else {
            res.status(400).json("Invalid ID entered. Please try again");
        }
    } catch (error) {
        res.status(500).json(response.error || "An error occurred. Please try again");
    }
};

const deleteProgram = async (req, res) => {
    try {
        //#swagger.tags=['Program']
        const programId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('programs').deleteOne({ _id: programId });
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
    getAllProgram,
    getSingle,
    postProgram,
    putProgram,
    deleteProgram,
};