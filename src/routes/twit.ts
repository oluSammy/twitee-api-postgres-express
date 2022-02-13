import { createTwit, deleteTwit, getAllTwits, getAllUserTwits, getTwits } from '../controllers/tweetController'
import { createComment, getComments } from '../controllers/commentController';
import express from 'express'
import { protectRoute } from '../controllers/authController';
import { getLikes, likeTwit } from '../controllers/likeController';
import validationMiddleware from '../middleware/validationMiddleware';
import { validateComment, validateTwit } from '../utils/validations';


const router = express.Router();
//Twit router
router.post('/', protectRoute, [validationMiddleware(validateTwit)], createTwit)
router.delete('/:id', protectRoute, deleteTwit)
router.get('/:id/allTwits', protectRoute, getTwits)
router.get('/', protectRoute, getAllTwits)
router.get('/userTweet', protectRoute, getAllUserTwits)



//Comment router
router.post('/:id/comment', protectRoute, [validationMiddleware(validateComment)], createComment)
router.get('/:id/comments', protectRoute, getComments)


//Like router
router.post('/:id/like', protectRoute, likeTwit)
router.get('/:id/likes', protectRoute, getLikes)

export default router