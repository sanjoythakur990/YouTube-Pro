const API_KEY = "AIzaSyC16Q7YsJ3bSd8Qrfr6Gg1qHeQ7hRyiJ9c";
const BASE_KEY= "https://www.googleapis.com/youtube/v3";

// GET VIDEOS
// let query="cars";
function getVideos(query){
    fetch(`${BASE_KEY}/search?key=${API_KEY}&type=video&q=${query}&maxResults=10&part=snippet`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        displayVideos(data.items);
    })
}

// getVideos();

document.getElementById("search-btn").addEventListener("click",()=>{
    getVideos(document.getElementById("search-input").value);
})


function displayVideos(videos){
    // videos => array of videos
    document.getElementById("videos-container").innerHTML="";
    videos.map((video)=>{
        document.getElementById("videos-container").innerHTML+=
        `
        <a href="./video.html?videoId=${video.id.videoId}">
            <li>
                <img src="${video.snippet.thumbnails.high.url}">
                <p>${video.snippet.title}</p>
            </li>
        </a>
        `
    })
}