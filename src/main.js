import './style.css'
import heroImg from './assets/hero.png'
import refreshIcon from './assets/refresh.png'


const date = new Date();

const greeting = () => {
  const hour = date.getHours();
  if (hour < 12) {
    return "GOOD MORNING";
  } else if (hour < 18) {
    return "GOOD AFTERNOON";
  } else {
    return "GOOD EVENING";
  }
};

const refresh = () => {
  location.reload();
};

function toggleFullView() {
  
}
function reloadPage() {
  window.location.reload();
}

const dateOptions = { 
  weekday: 'long', 
  month: 'long', 
  day: 'numeric' 
};

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

const formattedDate = date.toLocaleDateString('en-US', dateOptions);
const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_API_KEY}`;

let media;
let data;

document.querySelector('#app').innerHTML = `
<div id="loading-screen">
  <div class="loader"></div>
  <p>Loading...</p>
</div>
`



fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      data = data;
      console.log(daa)

        if (data.media_type === "image") {
        media = `<img src="${data.url}"/>`;
        } else {
        media = `<video src="${data.url}" controls></video>`;
        }

    

      document.querySelector('#app').innerHTML = `
      <div id="bg-container">
        ${media}
      </div>
        <section id="top">
          <div class="nav">
            <div class="logo-container">
              <p class="logo-text"> AstroTab </p>
              <div class="logo">
                <img src="${heroImg}" alt="Astro Tab Logo" />
              </div>
            </div>
            <div class="nav-buttons">
              <button class="reload" onclick="reloadPage()">
                <img src="${refreshIcon}" alt="Reload Icon" />
              </button>
              <button class="full-view" onclick="toggleFullView()"></button>
            </div>
          </div>
        </section>
        
        <section id="center">
        <div>
          <h1>${formattedTime}</h1>
          <p>${greeting()} - ${formattedDate}</p>
        </div>
        
      </section>


      <section id="bottom">
        <div class="img-data">
          <h2 class="title">${data?.title}</h2>
          <p class="date">${data?.date} NASA / ESA / CSA / STSc </p>
          <p class="explanation">${data?.explanation}</p>
        </div>
        
      </section>

      `

})
    .catch(err => {
        // document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
      console.log("Error", err)

      document.querySelector('#app').innerHTML = `
      <div id="bg-container">
      </div>
        <section id="top">
          <div class="nav">
            <div class="logo-container">
              <p class="logo-text"> AstroTab </p>
              <div class="logo">
                <img src="${heroImg}" alt="Astro Tab Logo" />
              </div>
            </div>
            <div class="nav-buttons">
              <button class="reload" onclick="reloadPage()">
                <img src="${refreshIcon}" alt="Reload Icon" />
              </button>
              <button class="full-view" id="full-view-button" onclick="toggleFullView()">
                
              </button>
            </div>
          </div>
        </section>
        
        <section id="center">
        <div>
          <h1>${formattedTime}</h1>
          <p>${greeting()} - ${formattedDate}</p>
        </div>
        
      </section>


      <section id="reload-section">
        <button id="reload-button" onclick="reloadPage()">Reload</button>  
      </section>

      `

    })
