import Router from 'express'
import Comments from '../controllers/comments.js'
import { verifyToken } from '../veryfyToken.js'
const router =new Router()

router.post('/',verifyToken, Comments.addComment)
router.get('/:videoId', Comments.getComments)
router.delete('/:id',verifyToken, Comments.deleteComment)



export default router