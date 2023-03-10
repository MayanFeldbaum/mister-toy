const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
// const socketService = require('../../services/socket.service')
const reviewService = require('./review.service')
const toyService =require ('../toy/toy.service')


async function getReviews(req, res) {
    console.log('here:',req.query);
    try {
        const reviews = await reviewService.query(req.query)
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

async function deleteReview(req, res) {
    try {
        const deletedCount = await reviewService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove review' })
        }
    } catch (err) {
        logger.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}


async function addReview(req, res) {
    var { loggedinUser } = req
    console.log(req.body)
    try {
        var review = req.body
        review.byUserId = loggedinUser
        review = await reviewService.add(review)
        review.aboutToy = await toyService.getById(review.toyId)
        loggedinUser = await userService.update(loggedinUser)
        review.byUser = loggedinUser
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)
        // delete review.byUserId
        res.send(review)
        // prepare the updated review for sending out
        // Give the user credit for adding a review
        // var user = await userService.getById(review.byUserId)
        // console.log('all review ', review, loggedinUser)
        
        // User info is saved also in the login-token, update it
        // socketService.broadcast({type: 'review-added', data: review, userId: loggedinUser._id})
        // socketService.emitToUser({type: 'review-about-you', data: review, userId: review.aboutUser._id})
        // const fullUser = await userService.getById(loggedinUser._id)
        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})
    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}