import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { createError } from "../error.js"
import jwt from 'jsonwebtoken'

const generateJwt = (id) => {
    return jwt.sign(
        {id},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
  }


class AuthController {
    async signup(req, res,next) {
        const {name,email,password}=req.body
        try{

            const hashPassword = await bcrypt.hash(password, 5)

            await User.create({name,email,password:hashPassword})
            
            return res.status(200).json({msg: 'success'})

        }catch(err){
            next(err)
        }

    }
    async signin(req, res,next) {
        
        try{
            const user = await User.findOne({name:req.body.name})
            if(!user){
                return next(createError(404, "User not found "))
            }
            const comparePassword= bcrypt.compareSync(req.body.password,user.password)

            if (!comparePassword){
                return next(createError(500,"Nie poprawne hasło"))
            }
            
            const token = generateJwt({id:user._id})
            const { password, ...others } = user._doc;
            
             res.cookie("access_token",token,{
                httpOnly: true,
            }).status(200).json(others)

        }catch(err){
            next(err)
        }

    }
    async googleAuth(req, res, next){
        const {name,email,img}=req.body
        try {
          const user = await User.findOne({ email: req.body.email });
          if (user) {
            const token = generateJwt({id:user._id})
            res
              .cookie("access_token", token, {
                httpOnly: true,
              })
              .status(200)
              .json(user._doc);
          } else {
            // const newUser = new User({
            //   ...req.body,
            //   fromGoogle: true,
            // });
            // console.log(req.body)
            const savedUser = await User.create({name,email,img,fromGoogle: true});
            const token = generateJwt({id:user._id})
            res
              .cookie("access_token", token, {
                httpOnly: true,
              })
              .status(200)
              .json(savedUser._doc);
          }
        } catch (err) {
          next(err);
        }
    }
}

export default new AuthController