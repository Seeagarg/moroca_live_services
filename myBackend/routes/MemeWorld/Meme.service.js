const {pool2} = require('../../config/db');


module.exports={
    getMeme:(callback)=>{
        const query = process.env.GET_MEME;
        pool2.query(query, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            return callback(error)
        } else {
            return callback('',results)
          }
        });
    },
    getRandom:(callback)=>{
        const query = process.env.GET_RANDOM_MEMES;
        console.log(query)
        pool2.query(query, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            return callback(error)
          } else {
            return callback('',results)
          }
        });
    },
    PostLike:(data,callback)=>{
        const { like, ani,created,updated ,id } = data;

        const query = process.env.LIKE_MEME; // Enclose column names in backticks
      
        pool2.query(query, [like, created,updated, id, ani], (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            return callback(error)
          } else {
            return callback('',results)
          }
        });
    },
    UnLike:(data,callback)=>{
        const {meme_id, ani} = data
        const query = process.env.DELETE_LIKE;
      
        pool2.query(query, [meme_id, ani], (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
           return callback(error)
          } else {
           return callback('',results)
          }
        });
    },
   
    MemeValue:(id,callback)=>{
        const memeQuery = process.env.GET_MEME_BY_CAT_ID;
      
        pool2.query(memeQuery, id, (memeError, memeResults) => {
          if (memeError) {
            console.error('Error executing meme query:', memeError);
            // res.status(500).json();
            return callback({ error: 'Error fetching meme data from the database' })
            return;
          }
    
          if (memeResults.length === 0) {
            return callback('', {error: 'No meme data found for the provided category ID'})
          }

          const categoryNameQuery = process.env.GET_MEME_CATEGORY;
      
          pool2.query(categoryNameQuery, id, (categoryError, categoryResults) => {
            if (categoryError) {
              console.error('Error executing category name query:', categoryError);
              return callback({ error: 'Error fetching category name from the database' })
            }
      
   
            if (categoryResults.length === 0) {
              return callback('',{ error: 'No category name found for the provided category ID' })
            }
      
   
            const responseData = {
              memeData: memeResults,
              categoryName: categoryResults[0].name
            };
      
            return callback('',responseData)
          });
        });
    },
    searchMeme:(categoryName,callback)=>{
      const query = process.env.SEARCH_MEME;
    
        try {
          pool2.query(query, [categoryName], (error, results) => {
            if (error) {
              console.error('Error executing the query:', error);
              return callback({ error: 'Error fetching data from the database' })
            } else {
              return callback('',results)
            }
          });
        } catch (err) {
          console.error('An error occurred:', err);
          return callback({ error: 'An error occurred while processing your request' })
        }
    }
    
}