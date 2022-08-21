import { createError } from '../error.js'
import Users from '../models/User.js'
import Video from '../models/Video.js'

class UsersController{
    async updateUser(req, res, next){
        // console.log(req.user.id.id
        if(req.params.id ===req.user.id.id){
            try{

                const updatedUser = await Users.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },
                {
                    new:true,
                }
                )

                return res.status(200).json(updatedUser)


            }catch(err){
                return next(err)
            }

        }else{
            return next(createError(403,"You can update only your account"))
        }
    }
    async deleteUser(req, res, next){
        if(req.params.id ===req.user.id.id){
            try{

                 await Users.findByIdAndDelete(req.params.id)

                return res.status(200).json("User has been deleted")


            }catch(err){
                return next(err)
            }

        }else{
            return next(createError(403,"You can delete only your account"))
        }
    }
    async getUser(req, res, next){
       try{
        const user =await  Users.findById(req.params.id)
        return res.json(user)
         
       }catch(err){
       return next(err)
       }
    }
    async likeUser(req, res, next){
        const id = req.user.id.id;
        const videoId = req.params.videoId;
        try {
          await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
          })
          res.status(200).json("The video has been liked.")
        } catch (err) {
          next(err);
        }

    }  async dislikeUser(req, res, next){
        const id = req.user.id.id
 
        const videoId = req.params.videoId;
        try {
          await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
          })
          res.status(200).json("The video has been disliked.")
      } catch (err) {
        next(err);
      }
    }
    async subscribeUser(req, res, next){
        try{
            await Users.findByIdAndUpdate(req.params.id,{
                $push:{subscribedUsers:req.params.id}
            })

            await  Users.findByIdAndUpdate(req.params.id,{
                $inc:{subscribers:1}
            })

            return res.status(200).json("Subscription  successfull")
        }catch(err){
           return next(err)
        }
    }
    async unsubscribeUser(req, res, next){
        try{
            await Users.findByIdAndUpdate(req.params.id,{
                $pull:{subscribedUsers:req.params.id}
            })

            await  Users.findByIdAndUpdate(req.params.id,{
                $inc:{subscribers:-1}
            })

            return res.status(200).json("Unsubscription  successfull")
        }catch(err){
           return next(err)
        }
    }
} 

export default new UsersController