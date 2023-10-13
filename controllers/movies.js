const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllMovies = async (req, res) => {
    //#swagger.tags=['movies']
    try {
        const result = await mongodb.getDatabase().db().collection('movies').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSingleMovie = async (req, res) => {
    //#swagger.tags=['movies']
    const movieId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db().collection('movies').find({ _id: movieId }).toArray();
        if (result.length === 0) {
            res.status(404).json({ error: 'Movie not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createMovie = async (req, res) => {
    //#swagger.tags=['movies']
    const movie = {
        title: req.body.title,
        genre: req.body.genre,
        releaseYear: req.body.releaseYear,
        director: req.body.director,
        mainCast: req.body.mainCast,
        rating: req.body.rating
    };
    try {
        const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
        if (response.acknowledged) {
            res.status(201).json(response.ops[0]); // Created
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the movie' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags=['movies']
    const movieId = new ObjectId(req.params.id);
    const movie = {
        title: req.body.title,
        genre: req.body.genre,
        releaseYear: req.body.releaseYear,
        director: req.body.director,
        mainCast: req.body.mainCast,
        rating: req.body.rating
    };
    try {
        const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: movieId }, movie);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Movie updated successfully' });
        } else {
            res.status(500).json({ error: 'Some error occurred while updating the movie' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['movies']
    const movieId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId });
        if (response.deletedCount > 0) {
            res.status(204).send(); // No Content
        } else {
            res.status(500).json({ error: 'Some error occurred while deleting the movie' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllMovies,
    getSingleMovie,
    createMovie,
    updateMovie,
    deleteMovie
};