const {pool3} = require('../../config/db')

module.exports={
    getCatVideos:(service_type,callback)=>{
         // Step 1: Retrieve categories by service_type
         const categoriesSql = process.env.GET_CATEGORY_VIDEOS_TT;
         pool3.query(categoriesSql, service_type, (err, categoriesResults) => {
           if (err) {
             console.error('Error querying categories:', err);
             return callback({ error: 'Internal Server Error' })
             
           }
       
           // Step 2: Fetch videos for each category with the dynamically set status
           const response = [];
           const fetchVideosForCategory = (categoryIndex) => {
             if (categoryIndex >= categoriesResults.length) {
               // When all categories have been processed, send the response
               return callback('',response)
             }
       
             const category = categoriesResults[categoryIndex];
             const desired_status = category.status; // Extract the desired status from the category data
       
             const videosSql = process.env.GET_VIDEOS_BY_CATEGORY;
             pool3.query(videosSql, [category.id, desired_status], (err, videosResults) => {
               if (err) {
                 console.error('Error querying videos:', err);
                 return callback({ error: 'Internal Server Error' })
               }
       
               // Add the category and its associated videos to the response
               response.push({
                 category: category,
                 videos: videosResults,
               });
       
               // Continue to the next category
               fetchVideosForCategory(categoryIndex + 1);
             });
           };
       
           // Start fetching videos for the first category
           fetchVideosForCategory(0);
         });
    },
    getCategories:(service,callback)=>{
        const query = process.env.GET_TT_CATEGORIES;
        pool3.query(query, service,(error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            return callback(error)
          } else {
           return callback('',results)
          }
        });
    },
    watchList:(data,callback)=>{
        const {ani,service}=data;
        const query = process.env.GET_WATCHLIST
        pool3.query(query,[ani,service], (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            return callback(error)
          } else {
            return callback('',results)
          }

        });
    },
    getVideosByCat:(id,callback)=>{
        const videoQuery = process.env.GET_VIDEO_BY_CAT;
        pool3.query(videoQuery, id, (videoError, videoResults) => {
          if (videoError) {
            console.error('Error executing the video query:', videoError);
            return callback({ error: 'Error fetching video data from the database' });
          } else {
            // Now that we have fetched the videos, fetch the category name
            const categoryQuery = process.env.GET_CATEGORY_NAME;
            pool3.query(categoryQuery, id, (categoryError, categoryResults) => {
              if (categoryError) {
                console.error('Error executing the category query:', categoryError);
                return callback({ error: 'Error fetching category data from the database' });
              } else {
                // Combine the video results and category name and send the response
                const responseData = {
                  videos: videoResults,
                  categoryName: categoryResults[0].category_name
                };
                return callback('',responseData);
              }
            });
          }
        });
    },
    fetchSingleVideo:(id,callback)=>{
        const query = process.env.GET_VIDEO_BY_ID;
        pool3.query(query, id,(error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
           return callback(error)
          } else {
            return callback('',results)
          }
        });
    },
    RelatedVideos:(id,callback)=>{
        const query = process.env.GET_RELATED_VIDEOS;
        pool3.query(query,id, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            return callback(error)
          } else {
            return callback('',results)
          }

        });
    },
    LikeVideo:(data,callback)=>{
        const { videoid, ani,status,servicename ,created } = data;

        const query = process.env.LIKE_TT_VIDEO; // Enclose column names in backticks
      
        pool3.query(query, [videoid, ani,status, servicename, created], (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            return callback(error)
          } else {
           return callback('',results)
          }
        });
    },
    Unlike:(data,callback)=>{
        const { ani, videoid } = data;

        const query = process.env.UNLIKE_TT_VIDEO;

        pool3.query(query, [ani, videoid], (error, results) => {
          if (error) {
              console.error('Error executing the query:', error);
              return callback(error)
          }
  
         return callback('',results)
      });
    },
    AddToList:(data,callback)=>{
        const { ani, videoid, service,name } = data;
        const query = process.env.ADD_TT_TO_WATCH_LIST;

        pool3.query(query,[ani, videoid, service,name], (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            return callback(error)
          } else {
            return callback('',results);
          }

        });
    },
    RemoveFromList:(data,callback)=>{
        const { ani, videoid } = data;

        const query = process.env.REMOVE_TT_FROM_WATCH_LIST;

                pool3.query(query, [ani, videoid], (error, results) => {
                  if (error) {
                      console.error('Error executing the query:', error);
                      return callback(error)
                  }
          
                  return callback('',results)
              });
    }

}