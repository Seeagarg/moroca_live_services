const {pool} = require('../../config/db');



module.exports = {
    fetchArtist:(service,callback)=>{
        console.log(service)
        const query =process.env.FETCH_ARTIST_MAD
        pool.query(query,service, (error, results) => {
          if(error){
            return callback(error)
          }
          else{
            return callback('',results);
          }
        });
    },
    checkSubscription:(data,callback)=>{

        const query = process.env.CHECK_REDIRECT
        // const query = 'SELECT * FROM tbl_subscription WHERE ani=? AND service_type=?';
      
        pool3.query(query, [ani, service], (error, results) => {
            if (error) {
              console.error('Error executing the query:', error);
              callback(error);
            } else {
              callback('',results)
            }
          });
    },
    fetchVideo:(id,callback)=>{
        const query = process.env.FETCH_VIDEO_BY_ID;
        pool.query(query,id, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            return callback(error)
          } else {
           return callback('',results)
          }
        });
    },
    fetchSingleVideo:(id,callback)=>{
        const query = process.env.FETCH_SINGLE_VIDEO;
        pool.query(query,id, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            return callback(error)
          } else {
            return callback('',results)
          }
        });
    },
    fetchRelated:(id,callback)=>{
        const query = process.env.RELATED_VIDEOS;
        pool.query(query,id, (error, results) => {
          if (error) {
            console.error('Error executing the query:', error);
            callback(error);
          } else {
            callback('',results)
          }
        });
    }
}