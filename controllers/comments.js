import { createError } from '../error.js'
import Comments from '../models/Comments.js'
import Comment from '../models/Comments.js'
import Video from '../models/Video.js'

class CommentController{
    async addComment(req,res,next){
        const {videoId,desc} =req.body

        try{

            const saveComment = await Comments.create({ userId:req.user.id.id,videoId,desc})
            return res.status(200).send(saveComment)

        }catch(err){
            next(err)
        }

    }
    async getComments(req,res,next){
        try{

            const comments =await  Comments.find({videoId:req.params.videoId})
            return res.status(200).json(comments)
        }catch(err){
            next(err)
        }
    

    }
    async deleteComment(req,res,next){

     
        try{

            const comment = await Comments.findById(res.params.id)
            const video =await Video.findById(res.params.id)

            if(req.user.id.id===comment.userId || req.user.id.id===video.userId ){
                await Comments.findByIdAndDelete(req.params.id)
                return res.status(200).json("The comment has been deleted.")
            }else{
                return next(createError(403,"You can delete only your comment!"))
            }

        }catch(err){
            next(err)
        }

    }
} 

export default new CommentController