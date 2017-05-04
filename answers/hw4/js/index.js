var template="<div class='box'><div class='top'><img src='{image1}'></div><div class='bottom'><div class='photo'><img src='{image2}'></div><div class='textbox'><div class='channel'>{channel}</div><div class='name'>{name}</div></div></div></div>"
var data_url="https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends";

$.ajax({
 type: 'GET',
 url: data_url,
 headers: {
   'Client-ID': '3nic4qrhou17yeyhgg0zh54tsa9sdv'
 },
 success: function(res) {
	 var col="<div class='col'></div>"
 		for(var i=0;i<20;i++){
 		var now_template=template.replace("{channel}",res.streams[i].channel.status)
					 .replace("{name}",res.streams[i].channel.name)
					 .replace("{image1}",res.streams[i].channel.video_banner)
					 .replace("{image2}",res.streams[i].channel.logo);
	 $(".container").append(now_template);
 }
 }
});
