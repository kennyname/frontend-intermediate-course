let nowIndex=0;
let isLoading=false;
//https://gist.github.com/joyrexus/7307312 參考
document.addEventListener('DOMContentLoaded',function(){
	appendData();
	//網頁一載入先載進前20筆
	window.addEventListener('scroll',function(){
		if(document.body.scrollTop + window.innerHeight > document.body.scrollHeight - 200){
			if(isLoading==false){
				appendData();
			}
		}
	});
});
function getData(cb){
	//http://www.smalljacky.com/programming-language/php/ajax-javascript-jquery-example-for-php/ 參考
	isLoading=true;
	const request=new XMLHttpRequest();
	request.open('GET','https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=20&offset='+nowIndex+'',true);
	request.setRequestHeader('client-id','3nic4qrhou17yeyhgg0zh54tsa9sdv');
	request.onreadystatechange=function(){
		if(request.readyState==4 && request.status==200){
			const data = JSON.parse(request.responseText);
			cb(null,data);	
	}
	}
	request.send();

}
//以上是第一步，拿資料

function appendData(){
	getData((err,data)=>{
		if(err){
			console.log(err);
		}
		else{
			const streams=data.streams;
			 const container=document.querySelector('.container');
			for(var i=0;i<streams.length;i++){
			 //http://www.cnblogs.com/pigtail/archive/2013/03/11/2953848.html 參考
				container.insertAdjacentHTML('beforeend', getColumn(streams[i]))
		}
			nowIndex+=20;
			isLoading=false;
	}
	});
}
//callback function

function getColumn(data){
	return `
	<div class="box">
       	    <div class="top">
		<img src="${data.preview.medium}"onload="this.style.opacity=1"/>
	    </div>
       	    <div class="bottom">
          	<div class="photo">
		   <img src="${data.channel.logo}"onload="this.style.opacity=1"/>
		</div>
      		<div class="intro">
		   <div class="textbox">
        		<div class="channel">${data.channel.status}</div>
        		<div class="name">${data.channel.display_name}</div>
		   </div>
     	        </div>
            </div>
  	</div>
				`;
}
