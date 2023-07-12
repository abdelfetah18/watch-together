import { useEffect, useState } from "react";

export default function YoutubePlayer({ selectedVideo, is_admin=false, ws }){
  let [youTube_iframe_api_ready,setYouTubeIframeAPIReady] = useState(false);

  useEffect(() => {
      let script = document.createElement('script');
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
      window.onYouTubeIframeAPIReady = () => {
        if(selectedVideo)
          createYoutubeIframeAPI(selectedVideo, is_admin ?? onReady);
        setYouTubeIframeAPIReady(true);
      }

      window.onError = onError;
  },[]);

  useEffect(() => {
    if(ws){
      ws.addEventListener("video_player",({ detail: payload }) => {
        let { action, video_player_data } = payload;
        console.log({payload})
        // "play" || "pause" || "update" || "start" || "sync"
        if(action == "sync" && is_admin && window.videoPlayer){
          let action = "update";
          let playerState = window.videoPlayer.playerInfo.playerState;
          if(playerState == 1)
            action = "start";
          if(playerState == 2)
            action = "pause";
    
          let payload = { action, video_player_data: { timestamp: window.videoPlayer.playerInfo.currentTime, video_id: window.videoPlayer.playerInfo.videoData.video_id }};
          ws.send(JSON.stringify({ eventName: "video_player", payload }));
          return;
        }

        if(window.videoPlayer && window.videoPlayer.playerInfo.videoData.video_id != video_player_data.video_id){
          window.videoPlayer.destroy();
          window.videoPlayer = null;
          createYoutubeIframeAPI("https://www.youtube.com/watch?v="+video_player_data.video_id, (event) => {
            handle_action(action, video_player_data);
          });
        }else{
          handle_action(action, video_player_data);
        }
      });

      if(ws.readyState == ws.OPEN){
        setTimeout(() => {
          if(!is_admin){
            let payload = { action: "sync", video_player_data: {}};
            console.log("ws.readyState", payload);
            ws.send(JSON.stringify({ eventName: "video_player", payload }));
          }
        },3000);
      }else{
        ws.onopen = (ev) => {
          let payload = { action: "sync", video_player_data: {}};
          console.log("ws.onopen", payload);
          ws.send(JSON.stringify({ eventName: "video_player", payload }));
        }
      }

      return () => {
        ws.removeEventListener("video_player", (ev) => {
          console.log("video_player event listener removed.");
        },{});
      }
    }

  },[ws]);

  function handle_action(action, video_player_data){
    switch(action){
      case "play":{
        if(window.videoPlayer)
          window.videoPlayer.destroy();
        window.videoPlayer = null;
        createYoutubeIframeAPI("https://www.youtube.com/watch?v="+video_player_data.video_id,(event) => {
          window.videoPlayer.seekTo(video_player_data.timestamp);
          window.videoPlayer.playVideo();
        });
        break;
      }

      case "pause":{
        if(!window.videoPlayer){
          createYoutubeIframeAPI("https://www.youtube.com/watch?v="+video_player_data.video_id,(event) => {
            window.videoPlayer.pauseVideo();
            window.videoPlayer.seekTo(video_player_data.timestamp);
          });
        }else{
          window.videoPlayer.pauseVideo();
          window.videoPlayer.seekTo(video_player_data.timestamp);
        }
        break;
      }
      
      case "update":{
        if(!window.videoPlayer){
          createYoutubeIframeAPI("https://www.youtube.com/watch?v="+video_player_data.video_id, (event) => {
            window.videoPlayer.seekTo(window.videoPlayer.timestamp);
          });
        }else{
          window.videoPlayer.seekTo(video_player_data.timestamp);
        }
        break;
      }

      case "start":{
        if(!window.videoPlayer){
          createYoutubeIframeAPI("https://www.youtube.com/watch?v="+video_player_data.video_id,(event) => {
            window.videoPlayer.seekTo(video_player_data.timestamp);
            window.videoPlayer.playVideo();
          });
        }else{
          window.videoPlayer.seekTo(video_player_data.timestamp);
          window.videoPlayer.playVideo();
        }
        break;
      }
    }
  }

  useEffect(() => {
    if(window.videoPlayer){
      window.videoPlayer.destroy();
      window.videoPlayer = null;
    }
    
    if(youTube_iframe_api_ready && selectedVideo){
      createYoutubeIframeAPI(selectedVideo, is_admin ?? onReady);
    }
  },[selectedVideo]);

  function onReady(event){
    event.target.playVideo();
    let video_id = event.target.playerInfo.videoData.video_id;
    let payload = { action: "play", video_player_data: { video_id, timestamp: 0 }};
    ws.send(JSON.stringify({ eventName: "video_player", payload }));
  }

  function onError(evt){
    console.log({ onError:evt });
  }

  function createYoutubeIframeAPI(video_url,onReady){
    console.log("Create new youtube iframe");

    let videoUrl = new URL(video_url);
    let videoId = videoUrl.searchParams.get("v");
    
    let videoPlayer = new YT.Player('player', {
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
      'onReady': onReady,
      'onStateChange': is_admin ? onPlayerStateChange : onPlayerStateChangeUser,
      }
    });
    
    window.videoPlayer = videoPlayer;
    return videoPlayer;
  }

  function onPlayerStateChange(event) {
    let action = "update";
    if(event.data == 0)
      action = "stop";
    
    if(event.data == 1)
      action = "start";
    
    if(event.data == 2)
      action = "pause";
    
    let payload = { action, video_player_data: { timestamp: event.target.playerInfo.currentTime, video_id: event.target.playerInfo.videoData.video_id }};
    ws.send(JSON.stringify({ eventName: "video_player", payload }));
  }

  function onPlayerStateChangeUser(event){
    console.log("event:",event);
  }

  return(
    <div className="w-full h-full" id="player"></div>
  )
}