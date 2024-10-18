const { fetchArtist, checkSubscription, fetchVideo, fetchSingleVideo, fetchRelated } = require('./madfunny.service');


module.exports={
    FetchArtistController: (req, res) => {
        const service=req.query.service
        fetchArtist(service,(err,result)=>{
            if (err) {
                console.error('Error executing the query:', err);
                res.status(500).json({ error: 'Error fetching data from the database' });
              } else {
                res.json(result);
              }
        });
    },
    CheckRedirect:(req,res)=>{
        const ani = req.query.ani;
        const service = req.query.service;
        const result = req.query.result;
      
        console.log(service, ani);
      
        if(result === "active") {
            // If result is active, simply return count as 1
            return res.json([{ COUNT: 1 }]);
        }
    
      checkSubscription(data,(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Error fetching data from the database' });
        }
        else{
            res.json(results); 
        }
      })

    },
    FetchVideosById:(req,res)=>{
        const id=req.params.id
       fetchVideo(id,(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Error fetching data from the database' });
        }
        else{
            return res.json(result)
        }
       })
    },
    FetchSingleVideoById:(req,res)=>{
        const id=req.params.id
        fetchSingleVideo(id,(err,result)=>{
            if(err){
                return res.status(500).json({ error: 'Error fetching data from the database' });
            }
            else{
                return   res.json(result);
            }
        })
    },
    FetchRelatableVideo:(req,res)=>{
        const id=req.params.id
        fetchRelated(id,(err,result)=>{
            if(err){
              return res.status(500).json({ error: 'Error fetching data from the database' });
            }
            else{
                return res.json(result);
            }
        })
    }
}