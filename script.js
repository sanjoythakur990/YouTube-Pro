// const API_KEY = "AIzaSyC16Q7YsJ3bSd8Qrfr6Gg1qHeQ7hRyiJ9c"
const API_KEY ="AIzaSyBmOfUnRNYc22e04ZmK79uRbPb6388K9AE"
const BASE_KEY= "https://www.googleapis.com/youtube/v3";

// GET VIDEOS
// let query="cars";
function getVideos(query){
    fetch(`${BASE_KEY}/search?key=${API_KEY}&type=video&q=${query}&maxResults=2&part=snippet`)
    .then((res)=> res.json())
    .then((data)=>{
        // console.log(data);
        displayVideos(data.items);
    })
}



document.getElementById("search-btn").addEventListener("click",()=>{
    getVideos(document.getElementById("search-input").value);
})

// function getChannelIcon(video){
//     fetch(
//         `${BASE_KEY}/channels?key=${API_KEY}&part=snippet&part=statistics&id=${video.snippet.channelId}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//             // console.log("Inside", data.items[0]);
//             video.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
//             // console.log(channelIcon);
//           // console.log(video.channelThumbnail + " thumbnail taken"); //
//         //   display(video);
//         });
    
// }

async function getChannelIcon(video) {
    const response = await fetch(
        `${BASE_KEY}/channels?key=${API_KEY}&part=snippet&part=statistics&id=${video.snippet.channelId}`
    );
    const data = await response.json();
    video.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
}


async function displayVideos(videos) {
    document.getElementById("videos-container").innerHTML = "";
    for (const video of videos) {
        await getChannelIcon(video);
        document.getElementById("videos-container").innerHTML +=
            `<div class="video">
                <a href="/video.html?videoId=${video.id.videoId}">
                    <img src="${video.snippet.thumbnails.high.url}" class="thumbnail" alt="">
                    <div class="content"> 
                        <img src="${video.channelThumbnail}" class="channel-icon" alt="">
                        <div class="info">
                            <h4 class="title">${video.snippet.title}</h4>
                            <p class="channel-name">${video.snippet.channelTitle}</p>
                        </div>
                    </div>
                </a>
            </div>`;
    }
}

// function displayVideos(videos){
//     // videos => array of videos
//     document.getElementById("videos-container").innerHTML="";
//     videos.map((video)=> {
//         getChannelIcon(video);
//         // console.log(channelIcon);
//         // console.log(video.etag);
//         // console.log(thumbnail);
//         document.getElementById("videos-container").innerHTML+=
        
//         `
//         <div class="video" id="videos-container">
//         <a href="/video.html?videoId=${video.id.videoId}">
//         <img src="${video.snippet.thumbnails.high.url}" class="thumbnail" alt="">
//         <div class="content"> 
//         <img src="${video.channelThumbnail}" class="channel-icon" alt="">
//               <div class="info">
//               <h4 class="title">${video.snippet.title}</h4>
//               <p class="channel-name">${video.snippet.channelTitle}</p>
//               </div>
//               </div>
//               </a>
//               </div>
//               `;
//     })
// }

getVideos("");


const buttons = document.querySelectorAll('.hover-button');

buttons.forEach(button => {
  button.addEventListener('click',()=>{
    getVideos(button.innerText);
    button.classList.toggle('green');
    // button.classList.remove('green');
  });
});

