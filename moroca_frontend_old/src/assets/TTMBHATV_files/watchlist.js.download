


const wlist=(vid,uid)=>
{

console.log(vid,uid);

	let d={
		  action:"3",
		 uid:uid,
	     vid:vid
	     }
         $.ajax({
				type:"POST",
				url:"/ApiServlet",
				headers: {
		         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		        },
					data:d,
					
					success : function(res)
					{
			console.log(res)
			
			console.log(typeof res)
			
			if(res=='true')
			{
				alert("add video in list ");
			}
			else
			{
			    alert("Video already add in watchList");
			}
			
			}})}







