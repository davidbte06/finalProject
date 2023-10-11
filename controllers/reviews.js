const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all reviews
const getAll = async (req, res) => {
  try {
    //#swagger.tags=['Reviews']
    const result = await mongodb.getDatabase().db().collection('reviews').find();
    const reviews = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// Get a single review by ID
const getSingle = async (req, res) => {
  try {
    //#swagger.tags=['Reviews']
    const reviewId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        error: 'Invalid ObjectId'
      });
      return;
    }
    const result = await mongodb.getDatabase().db().collection('reviews').find({
      _id: reviewId
    });
    const reviews = await result.toArray();
    if (reviews.length === 0) {
      res.status(404).json({
        error: 'Review not found'
      });
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(reviews[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// Create a review
const createReview = async (req, res) => {
  //#swagger.tags=['Reviews']
  try {
    if (!req.body || !req.body.user || !req.body.content || !req.body.rating || !req.body.mediaType || !req.body.mediaName) {
      res.status(400).json('Missing required data in the request body');
      return;
    }
    const review = {
      user: req.body.user,
      content: req.body.content,
      rating: req.body.rating,
      mediaType: req.body.mediaType,
      mediaName: req.body.mediaName,
    };
    const response = await mongodb.getDatabase().db().collection('reviews').insertOne(review);
    if (response.acknowledged) {
      res.status(201).json('Review created successfully');
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the review');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// Update a review by ID
const updateReview = async (req, res) => {
  try {
    //#swagger.tags=['Reviews']
    if (!req.params.id) {
      res.status(400).json('Review ID is missing in the request parameters');
      return;
    }
    const reviewId = new ObjectId(req.params.id);
    const updatedReview = {
      user: req.body.user,
      content: req.body.content,
      rating: req.body.rating,
      mediaType: req.body.mediaType,
      mediaName: req.body.mediaName,
    };
    const response = await mongodb.getDatabase().db().collection('reviews').updateOne({
      _id: reviewId
    }, {
      $set: updatedReview
    });
    if (response.modifiedCount > 0) {
      res.status(204).json('Review updated successfully');
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the review');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
  try {
    //#swagger.tags=['Reviews']
    if (!req.params.id) {
      res.status(400).json('Review ID is missing in the request parameters');
      return;
    }
    const reviewId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('reviews').deleteOne({
      _id: reviewId
    });
    if (response.deletedCount > 0) {
      res.status(204).json('Review deleted successfully');
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the review');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

module.exports = {
  getAll,
  getSingle,
  createReview,
  updateReview,
  deleteReview
};
