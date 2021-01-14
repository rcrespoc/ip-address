const $ipInput = document.querySelector('#ip');
const $form = document.querySelector('.form');
const $ipInfo = document.querySelector('.ip-info');


document.addEventListener('click', async e => {
  e.preventDefault();
  if(e.target.dataset.id === 'img'){
    e.preventDefault();
    let ip = $ipInput.value;
    const obj = await pedirDatos(ip);
    const objLatLong = llenarObjeto(obj.lat, obj.lng);
    pintarHTML(obj);
    dibujarMapa(objLatLong);
  }
})

const llenarObjeto = (lat, lng) =>{
  let obj = {
    container: "map",
    center: [lng, lat],
    zoom: 15,
    style: "mapbox://styles/mapbox/streets-v11",
  };
  return obj;
}

const dibujarMapa = (obj) => {
  const arr = obj.center;
  mapboxgl.accessToken =
    "pk.eyJ1IjoicmNyZXNwb2MiLCJhIjoiY2tqdzQ1eGZqMGI1ZDJxcW9kZDVtYTJxayJ9.8nC53tvio7xLxnzWhrqkMA";
  let map = new mapboxgl.Map(obj);
  var marker = new mapboxgl.Marker()
    .setLngLat([...arr])
    .addTo(map);
}

const pedirDatos = async (ip) => {
  let url = `https://geo.ipify.org/api/v1?apiKey=at_oZbrPqnY2GULs3QK0usj2rOgAfu9r&ipAddress=${ip}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return manejarDatos(data);
  } catch (error) {
    console.log(error);
  }
}

const manejarDatos = data => {
  const datos = {
    ip: data.ip,
    country: data.location.country,
    city: data.location.city,
    region: data.location.region,
    lat: data.location.lat,
    lng: data.location.lng,
    timezone: data.location.timezone,
    isp: data.isp,
  };
  return datos;
}
const pintarHTML = obj => {
  const { ip, region, city, country, timezone, isp } = obj;
  $ipInfo.innerHTML = `
        <article class="container">
          <section class="ip-address text-center text-lg-start">
            <h6>IP ADDRESS</h6>
            <h3>${ip}</h3>
          </section> <!-- IP ADDRESS -->
          <section class="location text-center mt-1 mt-lg-0 text-lg-start">
            <h6>LOCATION</h6>
            <h3>${region}, ${city}, ${country}</h3>
          </section> <!-- LOCATION -->
          <section class="timezone text-center mt-1 mt-lg-0 text-lg-start">
            <h6>TIMEZONE</h6>
            <h3>UTC ${timezone}</h3>
          </section> <!-- TIMEZONE -->
          <section class="isp text-center mt-1 mt-lg-0 text-lg-start">
            <h6>ISP</h6>
            <h3>${isp}</h3>
          </section> <!-- IP ADDRESS -->
        </article>
  `;
}