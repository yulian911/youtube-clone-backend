import Video from '../models/Video.js'
import User from '../models/User.js'

class VideoController{
    async addVideo(req,res,next){
        const {title,desc,imgUrl,videoUrl} =req.body

        try {
          const savedVideo = await Video.create({ userId: req.user.id.id,title,desc,imgUrl,videoUrl })
          res.status(200).json(savedVideo);
        } catch (err) {
          next(err);
        }

    }
    async updateVideo(req,res,next){

        try {
            const video = await Video.findById(req.params.id);
            if (!video) return next(createError(404, "Video not found!"));
            if (req.user.id === video.userId) {
              const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                  $set: req.body,
                },
                { new: true }
              );
              res.status(200).json(updatedVideo);
            } else {
              return next(createError(403, "You can update only your video!"));
            }
          } catch (err) {
            next(err);
          }

    }
    async deleteVideo(req,res,next){

        try {
            const video = await Video.findById(req.params.id);
            if (!video) return next(createError(404, "Video not found!"));
            if (req.user.id === video.userId) {
              await Video.findByIdAndDelete(req.params.id);
              res.status(200).json("The video has been deleted.");
            } else {
              return next(createError(403, "You can delete only your video!"));
            }
          } catch (err) {
            next(err);
          }

    }
    async getVideo(req,res,next){

        try {
            const video = await Video.findById(req.params.id);
            res.status(200).json(video);
          } catch (err) {
            next(err);
          }

    }
    async addView(req,res,next){

        try {
            await Video.findByIdAndUpdate(req.params.id, {
              $inc: { views: 1 },
            });
            res.status(200).json("The view has been increased.");
          } catch (err) {
            next(err);
          }

    }
    async random(req, res, next){
        try {
          const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
          res.status(200).json(videos);
        } catch (err) {
          next(err);
        }
      }
      async trend(req, res, next){
        try {
          const videos = await Video.find().sort({ views: -1 });
          res.status(200).json(videos);
        } catch (err) {
          next(err);
        }
      };
      async sub(req, res, next){
        try {
          const user = await User.findById(req.user.id.id);
          const subscribedChannels = user.subscribedUsers;
      
          const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
              return await Video.find({ userId: channelId });
            })
          );
      
          res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
        } catch (err) {
          next(err);
        }
      };
      async getByTag(req, res, next){
        const tags = req.query.tags.split(",");
        try {
          const videos = await Video.find({ tags: { $in: tags } }).limit(20);
          res.status(200).json(videos);
        } catch (err) {
          next(err);
        }
      };
      async search(req, res, next){
        const query = req.query.q;
        try {
          const videos = await Video.find({
            title: { $regex: query, $options: "i" },
          }).limit(40);
          res.status(200).json(videos);
        } catch (err) {
          next(err);
        }
      };
    
} 

export default new VideoController