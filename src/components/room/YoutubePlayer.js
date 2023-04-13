import { useEffect, useState } from "react";

export default function YoutubePlayer({ url, p, p_s, p_r, is_admin=false, i_pay, r_pay, ws, c_v }){
  var [player_state,setPlayerState] = p_s;
  var [player,setPlayer] = p;
  var [is_player_ready,setPlayerReady] = p_r;
  var [init_payload,setInitPayload] = i_pay;
  var [recv_payload,setRecvPayload] = r_pay;
  var [currentVideo,setCurrentVideo] = c_v;
  var [youtube_iframe_api_ready,setYoutubeIframeAPIReady] = useState(false);

  useEffect(() => {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => setYoutubeIframeAPIReady(true);
      window.onError = onError;
  },[]);

  useEffect(() => {
    if(recv_payload){
      if(recv_payload.data.action !== "sync"){
        var data = recv_payload.data.data;
        if(is_player_ready){
          var old_url = player.getVideoUrl();
          var _url = new URL(old_url);
          var old_video_id = _url.searchParams.get("v");
          if(data.video_id === old_video_id){
            switch(data.video_state){
              case 1:
                player.playVideo();
                player.seekTo(data.currentTime);
                break;
              case 2:
                player.pauseVideo();
                player.seekTo(data.currentTime);
                break;
              case 0:
                player.stopVideo();
                break;
              default:
                console.log("not available!");
                break;
            }
          }else{
            setPlayerReady(false);
            setCurrentVideo({ url: "https://www.youtube.com/watch?v="+data.video_id,currentTime: data.currentTime,video_state:data.video_state });
          }
        }else{
          setCurrentVideo({ url: "https://www.youtube.com/watch?v="+data.video_id,currentTime: data.currentTime,video_state:data.video_state });
        }
      }
      if(recv_payload.data.action === "sync"){
        if(ws && is_player_ready){
          var _url = player.getVideoUrl();
          var myUrl = new URL(_url);
          var video_id = myUrl.searchParams.get("v");
          var data = { target:"video_player", data:{ action:"update", data: { currentTime:player.getCurrentTime(),video_id,video_state: player_state } } };
          ws.send(JSON.stringify(data));
        }
      }
      setRecvPayload(null);
    }
  },[recv_payload,is_player_ready]);

  useEffect(() => {
    if(ws && is_player_ready){
      var _url = player.getVideoUrl();
      var myUrl = new URL(_url);
      var video_id = myUrl.searchParams.get("v");
      var data = { target:"video_player", data:{ action:"update", data: { currentTime:player.getCurrentTime(),video_id,video_state: player_state } } };
      ws.send(JSON.stringify(data));
    }
  },[player_state]);

  useEffect(() => {
    if(init_payload && ws && ws.readyState === ws.OPEN){
      ws.send(JSON.stringify(init_payload));
      setInitPayload(null);
    }
  },[init_payload]);

  useEffect(() => {
    if(player){
      player.destroy();
    }
    if(youtube_iframe_api_ready && currentVideo){
      createYoutubeIframeAPI(currentVideo);
    }
  },[currentVideo]);

  function onError(evt){
    console.log({ onError:evt });
  }

  function createYoutubeIframeAPI(curVid){
    console.log("create new youtube iframe!");
    var myUrl = new URL(curVid.url);
    var videoId = myUrl.searchParams.get("v");
    var p = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId,
      playerVars: {
        'enablejsapi':1,
        'playsinline': 0,
        'controls': 1,
        'modestbranding':1,
        'origin': window.origin,
        'disablekb': is_admin ? 0 : 1,
        'cc_load_policy': 1,
        'fs': 1,
        'autoplay':1
      },
      events: {
      'onReady': (evt) => {
        evt.target.playVideo();
        console.log("VideoPlayer is ready!");
        setPlayerReady(true);
        switch(curVid.video_state){
          case 1:
            evt.target.playVideo();
            evt.target.seekTo(curVid.currentTime);
            break;
          case 2:
            evt.target.pauseVideo();
            evt.target.seekTo(curVid.currentTime);
            break;
          case 0:
            evt.target.stopVideo();
            break;
          default:
            console.log("not available!");
            break;
        }
      },
      'onStateChange': is_admin ? onPlayerStateChange : onPlayerStateChangeUser,
      }
    });
    setPlayer(p);
  }

  function onPlayerStateChange(event) {
    setPlayerState(event.data);
  }

  function onPlayerStateChangeUser(event){
    console.log("event:",event);
  }

  return(
    <div className="w-full h-full" id="player"></div>
  )
}