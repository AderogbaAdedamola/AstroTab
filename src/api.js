const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

export const fetchNasaData = () => {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        // let media;

        // if (data.media_type === "image") {
        // media = `<img src="${data.url}"/>`;
        // } else {
        // media = `<video src="${data.url}" controls></video>`;
        // }

        // document.querySelector("#app").innerHTML = `
        // <h1>${data.title}</h1>
        // ${media}
        // <p>${data.explanation}</p>
        // `;
    })
    .catch(err => {
        // document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
    })
};

async function fetchBackgroundData() {
  try {
    // Replace this with your actual API endpoint: 
    // const response = await fetch('https://example.com');
    // const data = await response.json();
    
    // Simulated Mock Data Response (Toggle between 'image' and 'video' to test)
    const data = {
      type: "video", // Can be "image" or "video"
      url: "https://w3schools.com" // Use your actual asset URL here
    };

    renderBackground(data);
  } catch (error) {
    console.error("Error fetching background data:", error);
  }
}

// Function to handle the DOM rendering
function renderBackground(data) {
  const container = document.getElementById('bg-container');
  
  // Clear any existing background elements
  container.innerHTML = '';

  if (data.type === 'video') {
    // Create and configure video element
    const video = document.createElement('video');
    video.src = data.url;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true; // Essential for background video autoplay on iOS
    
    container.appendChild(video);
  } 
  else if (data.type === 'image') {
    // Create and configure image element
    const img = document.createElement('img');
    img.src = data.url;
    img.alt = "Dynamic Background";
    
    container.appendChild(img);
  } 
  else {
    console.warn("Unknown background type received:", data.type);
    // Optional fallback (e.g., set a background color)
    document.body.style.backgroundColor = "#222"; 
  }
}