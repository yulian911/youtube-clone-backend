import Router from 'express'
import Users from '../controllers/users.js'
import Auth from '../controllers/auth.js'
const router =new Router()

// router.post('/',Users.register)
router.post('/signin',Auth.signin)
router.post('/signup',Auth.signup)
router.post("/google", Auth.googleAuth)
// router.post('/google',Auth.register)

export default router