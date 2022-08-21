import Router from 'express'
import Videos from '../controllers/videos.js'
import { verifyToken } from '../veryfyToken.js'
const router =new Router()

router.post('/',verifyToken,Videos.addVideo)
router.put('/:id',verifyToken,Videos.updateVideo)
router.delete('/:id',verifyToken,Videos.deleteVideo)
router.get('/find/:id',Videos.getVideo)
router.put('/view/:id',Videos.addView)
router.get('/trend',Videos.trend)
router.get('/tags',Videos.getByTag)
router.get('/random',Videos.random)
router.get('/search',Videos.search)
router.get('/sub',verifyToken,Videos.sub)


export default router