const { getCatVideos, getCategories, watchList, getVideosByCat, fetchSingleVideo, RelatedVideos, LikeVideo, Unlike, AddToList, RemoveFromList } = require("./tt.service");

module.exports={
    getCategoriesVideos:(req,res)=>{
        const service_type = req.params.service;
        getCatVideos(service_type,(err,result)=>{
            if(err){
                return res.status(500).json(err);
            }
            else{
                return res.json(result)
            }
        }) 
    },
    getCategory:(req,res)=>{
        const service=req.params.service
       getCategories(service,(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Error fetching data from the database' });
        }
        else{
            return res.json(result);
        }
       })
    },
    FetchWatchlist:(req,res)=>{
        const {ani,service}=req.params
        const data = req.params
        watchList(data,(err,result)=>{
            if(err){
                return res.status(500).json({ error: 'Error fetching data from the database' });
            }
            else{
                return res.json(result);
            }
        })
       
    },
    getCatVideos:(req,res)=>{
        const id = req.params.id;

        getVideosByCat(id,(err,result)=>{
            if(err){
                return res.status(500).json(err);
            }
            else{
                return res.json(result)
            }
        })
    },
    getSingleVideo:(req,res)=>{
        const id=req.params.id
        fetchSingleVideo(id,(err,result)=>{
            if(err){
                return res.status(500).json({ error: 'Error fetching data from the database' });
            }
            else{
                return res.json(result);
            }
        })
    },
    fetchRelatedVideo:(req,res)=>{
        const id=req.params.id;
        RelatedVideos(id,(err,result)=>{
            if(err){
                return res.status(500).json({ error: 'Error fetching data from the database' });
            }
            else{
                return res.json(result);
            }
        })
    },
    videoLike: (req, res) => {
        const { videoid, ani,status,servicename ,created } = req.body;
        const data = req.body;
        console.log("data===",videoid,ani,status,servicename,created)
        if (!videoid || !ani || !servicename) {
          return res.status(400).send({ error: 'All fields are required' });
        }
      
        LikeVideo(data,(err,result)=>{
            if(err){
                return res.status(500).json({ error: 'Error adding video to watchlist' });
            }
            else{
                return  res.json({ success: 'Video added to watchlist', insertedId: result.insertId });
            }
        })
      },

      unlikeVideo: (req, res) => {
        const { ani, videoid } = req.body;
        const data = req.body;
        if (!ani || !videoid ) {
          return res.status(400).send({ error: 'All fields are required' });
        }

        Unlike(data,(err,callback)=>{
            if(err){
                return res.status(500).json({ error: 'Error removing video from the watchlist' });
            }
            else{
                return res.json({ success: true, message: 'Video removed from watchlist' });
            }
        })
       
        },

        addToWatchlist: (req, res) => {
            const { ani, videoid, service,name } = req.body;
            const data = req.body;
            if (!ani || !videoid || !service) {
              return res.status(400).send({ error: 'All fields are required' });
            }
             AddToList(data,(err,result)=>{
                if(err){
                    return res.status(500).json({ error: 'Error adding video to watchlist' });
                }
                else{
                    return res.json({ success: 'Video added to watchlist', insertedId: result.insertId });
                }
             })
            },

            removeFromWatchlist: (req, res) => {
                const { ani, videoid } = req.body;
                const data = req.body;
                
                if (!ani || !videoid ) {
                  return res.status(400).send({ error: 'All fields are required' });
                }
               
                RemoveFromList(data,(err,result)=>{
                    if(err){
                        return res.status(500).json({ error: 'Error removing video from the watchlist' });
                    }
                    else{
                        return res.json({ success: true, message: 'Video removed from watchlist' });
                    }
                })

                },
}