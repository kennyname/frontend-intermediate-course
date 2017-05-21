let nowIndex=0;
let isLoading=false;
$(document).ready(function(){
	appendData();
	//網頁一載入先載進前20筆
	$(window).scroll(function(){
		if($(window).scrollTop() + $(window).height() > $(document).height() - 200){
			if(isLoading==false){
				appendData();
			}
		}
	});
});
function getData(cb){
	const clientID='3nic4qrhou17yeyhgg0zh54tsa9sdv';
	const limit=20;
	isLoading=true;
	$.ajax({
		url: 'https://api.twitch.tv/kraken/streams/?client_id=' + clientID + '&game=League%20of%20Legends&limit='+limit+'&offset='+nowIndex+'',
		success: function(response){

			cb(null,response);
	}
	});
}
//以上是第一步，拿資料
function appendData(){
	getData((err,data)=>{
		const streams=data.streams;
	// console.log(streams)
		const $container=$('.container');
	// console.log($container)
		for(var i=0;i<streams.length;i++){
			$container.append(getColumn(streams[i]))
		}
		nowIndex+=20;
		console.log(nowIndex)
		isLoading=false;
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
