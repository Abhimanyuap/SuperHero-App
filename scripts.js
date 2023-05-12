const searchBox = document.getElementById('search-box');
// const searchButton = document.getElementById('search-button');

const imgDiv = document.getElementsByClassName('img-display')
const display = document.getElementById('display-area');
const searchBox2 =document.querySelector('.search-box2');

let favouritesArray =JSON.parse(localStorage.getItem('favouriteSuperhero')) || [];

//onkeyup event for searching superhero

searchBox.addEventListener('keyup',(e)=>{
e.preventDefault();

let userData = e.target.value;

// fetching data

const api_key =`https://www.superheroapi.com/api.php/966441371382851/search/${searchBox.value}`;

  async function logJSONData() {
    try{
      const response = await fetch(api_key);
      getData = await response.json();
      if(getData.response === 'success'){
        showSearchList(getData.results);
      }
  } catch(error){
      console.log(error);
  }
  }
  logJSONData();

  // search dropdown for top 5 object
  showSearchList = (data) =>{
      searchBox2.innerHTML ='';
      data.slice(0,5).forEach((e,i) => {
        let div1 = document.createElement('div');
        div1.className = 'box1';
        div1.style.display = 'flex';
        let div2 = document.createElement('div');
        div2.className = 'box2';
        let div3 = document.createElement('div');
        div3.className = 'box3';

        let img = document.createElement('img');
        img.className = 'search-img';
        img.src = e.image.url;

        let p = document.createElement('p');
        p.innerText = e.name;

        div2.appendChild(img);
        div3.appendChild(p);
        div1.append(div2,div3);

        searchBox2.appendChild(div1);

        // adding favourite superhero
        let selectedSuperHero;

        div1.addEventListener('click', () => {
          getSuperhero(e,i);

          selectedSuperHero = e;

        });
        
        document.querySelector('.favourites').addEventListener('click',()=>{
          console.log(e);
          console.log(favouritesArray)

          if(selectedSuperHero){

          favouritesArray.push(selectedSuperHero);

          selectedSuperHero = null;

          localStorage.setItem('favouriteSuperhero',JSON.stringify(favouritesArray));

          }
          
        })

      });

  }

});



// displaying on dom
function getSuperhero(e,i){
  searchBox2.innerHTML ='';
  console.log("inside get superhero hello");
  document.querySelector('.name').innerText = e.name;

  Images(e);
  Appearance(e);
  Powerstats(e);
  Biography(e);
  Connections(e)
}

function Images(e){
  document.querySelector('.images').src = e.image['url'];
}

function Appearance(e){
  console.log(e.appearance['gender']);
  document.querySelector('.a1').innerText = e.appearance['gender'];
  document.querySelector('.a2').innerText = e.appearance['eye-color'];
  document.querySelector('.a3').innerText = e.appearance['height'][1];
  document.querySelector('.a4').innerText = e.appearance['weight'][1];
  document.querySelector('.a5').innerText = e.appearance['race'];
}

function Powerstats(e){
  document.querySelector('.p1').innerText = e.powerstats['combat'];
  document.querySelector('.p2').innerText = e.powerstats['durability'];
  document.querySelector('.p3').innerText = e.powerstats['intelligence'];
  document.querySelector('.p4').innerText = e.powerstats['power'];
  document.querySelector('.p5').innerText = e.powerstats['speed'];
  document.querySelector('.p6').innerText = e.powerstats['strength'];
}

function Biography(e){
  document.querySelector('.b1').innerText = e.biography['alter-egos'];
  document.querySelector('.b2').innerText = e.biography['first-appearance'];
  document.querySelector('.b3').innerText = e.biography['full-name'];
  document.querySelector('.b4').innerText = e.biography['place-of-birth'];
  document.querySelector('.b5').innerText = e.biography['publishers'];
}

function Connections(e){
  document.querySelector('.c1').innerText = e.connections['group-affiliations'];
  document.querySelector('.c2').innerText = e.connections['relatives'];
}

// changing display property of description tab
let BiographyEl = document.querySelector('.Biography');
let AppearanceEl = document.querySelector('.Appearance');
let PowerstatsEl = document.querySelector('.Powerstats');
let ConnectionsEl = document.querySelector('.Connections');

function biography(){
  BiographyEl.style.display = 'initial';
  AppearanceEl.style.display = 'none';
  PowerstatsEl.style.display = 'none';
  ConnectionsEl.style.display = 'none';
}
function appearance(){
  AppearanceEl.style.display = 'initial';
  BiographyEl.style.display = 'none';
  PowerstatsEl.style.display = 'none';
  ConnectionsEl.style.display = 'none';
}
function powerstats(){
  PowerstatsEl.style.display = 'initial';
  AppearanceEl.style.display = 'none';
  BiographyEl.style.display = 'none';
  ConnectionsEl.style.display = 'none';
}
function connections(){
  ConnectionsEl.style.display = 'initial';
  AppearanceEl.style.display = 'none';
  PowerstatsEl.style.display = 'none';
  BiographyEl.style.display = 'none';
}





