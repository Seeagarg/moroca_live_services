const { getMeme, getRandom, PostLike, UnLike, MemeCategory, MemeValue, searchMeme } = require("./Meme.service")

module.exports={
    getMemeCategories:(req,res)=>{
       getMeme((err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Error fetching data from the database' });
        }
        else{
            return res.json(result);
        }
       })
    },
    getRandomMeme:(req,res)=>{
        getRandom((err,result)=>{
            if(err){
                return  res.status(500).json({ error: 'Error fetching data from the database' });
            }
            else{
                return res.json(result);
            }
        })
    },
    LikeMeme:(req,res)=>{

        const { like, ani,created,updated ,id } = req.body;
        const data = req.body;
        if (!like || !ani || !id) {
          return res.status(400).send({ error: 'All fields are required' });
        }

    

        PostLike(data,(err,result)=>{
            if(err){
                return  res.status(500).json({ error: 'Error adding video to watchlist' });
            }
            else{
                return res.json({ success: 'Video added to watchlist', insertedId: result.insertId });

            }
        })
       
    },

    DeleteLike:(req,res)=>{
        const { meme_id, ani } = req.body;

        const data = req.body;
        if (!meme_id || !ani) {
          return res.status(400).send({ error: 'Both meme_id and ani are required' });
        }
      
        UnLike(data,(err,result)=>{
            if(err){
               return res.status(500).json({ error: 'Error deleting like from blog_memelike' });
            }
            else{
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'No matching like found to delete' });
                  } else {
                    res.json({ success: 'Like deleted successfully' });
                  }
            }
        })
    },
    getMemeValue:(req,res)=>{
        const id = req.params.id;
        MemeValue(id,(err,result)=>{
            if(err){
                return res.status(500).json(err);
            }
            else{
                return res.json(result);
            }
        })
    },
    searchMemesByCategoryName: (req, res) => {
        const categoryName = req.query.categoryName;

        // console.log(categoryName)

        searchMeme(categoryName,(err,result)=>{
            if(err){

                return res.status(500).json(err);
            }
            else{
                // console.log(result)
                return res.json(result);
            }
        })
        
      },

}