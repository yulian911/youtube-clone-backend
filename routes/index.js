import Router from 'express'
import Auth from './auth.js'
import Users from './users.js'
import videos from './videos.js'
import comments from './comments.js'

const router =new Router()

router.use('/auth',Auth)
router.use('/users',Users)
router.use('/videos',videos)
router.use('/comments',comments)

export default router