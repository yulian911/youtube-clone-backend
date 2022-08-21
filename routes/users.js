import Router from 'express'
import Users from '../controllers/users.js'
import { verifyToken } from '../veryfyToken.js'
const router =new Router()

router.put('/:id',verifyToken,Users.updateUser)
router.get('/find/:id',Users.getUser)
router.put('/like/:videoId',verifyToken,Users.likeUser)
router.delete('/:id',Users.deleteUser)
router.put('/dislike/:videoId',verifyToken,Users.dislikeUser)
router.put('/sub/:id',Users.subscribeUser)
router.put('/unsub/:id',Users.unsubscribeUser)



export default router