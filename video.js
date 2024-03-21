// const API_KEY = "AIzaSyC16Q7YsJ3bSd8Qrfr6Gg1qHeQ7hRyiJ9c";
const API_KEY= "AIzaSyBmOfUnRNYc22e04ZmK79uRbPb6388K9AE";
const BASE_KEY= "https://www.googleapis.com/youtube/v3";


window.addEventListener("load",()=>{
    const search= window.location.search;
    const params= new URLSearchParams(search);
    const videoId= params.get("videoId");
    // console.log(videoId);

    if (YT) {
        new YT.Player('video-container', {
            height: "420",
            width: "1000",
            videoId: videoId
        });
    }

    function getVideoDetails(){
        fetch(`${BASE_KEY}/videos?key=${API_KEY}&part=snippet&id=${videoId}`)
        .then((res)=> res.json())
        .then((data)=> {
            console.log("video details", data);
            document.getElementById("channelInfo").innerHTML=""
            document.getElementById("channelInfo").innerHTML += `
              <img src="${data.items[0].snippet.thumbnails.high.url}" class="channel-icon" alt="">
              <h5 class="channelName">${data.items[0].snippet.title}</h5>
              <p style="color:grey">${data.items[0].statistics.subscriberCount} Subscribers</p>
        `;
        document.getElementById("description").innerHTML = `
          <p>${data.items[0].snippet.localized.description} </p>
          `;
            console.log(data.items[0].snippet.channelId);
            getChannelDetails(data.items[0].snippet.channelId);
        })
    }

    function getChannelDetails(channelId){
        fetch(`${BASE_KEY}/channels?key=${API_KEY}&part=snippet&id=${channelId}`)
        .then((res)=> res.json())
        .then((data)=> {
            console.log("channel details", data);
        })
    }

    function getComments(){
        fetch(`${BASE_KEY}/commentThreads?key=${API_KEY}&part=snippet&videoId=${videoId}&maxResults=25`)
        .then((res)=> res.json())
        .then((data)=> {
            console.log("comments", data);
        })
    }

    function getVideoStats(){
        fetch(`${BASE_KEY}/videos?key=${API_KEY}&part=statistics&id=${videoId}`)
        .then((res)=> res.json())
        .then((data)=> {
            console.log("stats", data);
        })
    }

    getVideoStats();
    getVideoDetails();
    getComments(); 
})
