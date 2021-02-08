window.addEventListener('load', () => {
      
let lat;
let long;
 
navigator.geolocation.getCurrentPosition(position => { 
      console.log(position);
      long = position.coords.longitude;
      document.querySelector("#long").innerHTML =  long;
      lat = position.coords.latitude; 
      document.querySelector("#lat").innerHTML = lat;
      
      let api = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${long}&lat=${lat}&lang=fr`;
      
      fetch(api, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "c3b3f49f1emshd3576acb06653adp10643ajsn2b1dafd36bf6",
		"x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
            }
      }).then((response) =>
                  response.json().then(({data}) => {
             document.querySelector('#cityName').innerHTML = data[0].city_name;
            console.log(data);
                        document.querySelector('#temp').innerHTML = "<i class='fas fa-thermometer-three-quarters'></i></br>" + data[0].temp;
                        document.querySelector('#humidity').innerHTML = "<i class='fas fa-tint'></i></br></br>" + data[0].rh;

                        document.querySelector('#wind').innerHTML = "<i class='fas fa-wind'></i></br>" + data[0].wind_spd;
                  })
              
            )
      
            .catch((err) => console.log('Erreur : ' + err)); 
                                         
document.querySelector('form').addEventListener('submit', (e) => {
   e.preventDefault();
       
let ville = document.querySelector('#inputCity').value;
         
fetch(`https://geohub3.p.rapidapi.com/cities/search/${ville}?pageSize=10&page=1`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "c3b3f49f1emshd3576acb06653adp10643ajsn2b1dafd36bf6",
		"x-rapidapi-host": "geohub3.p.rapidapi.com"
	}
})
.then((response) => response.json().then(({data}) => {
      console.log(data);
      let Data = data.cities[0];
      console.log(Data);
      document.querySelector('#cityName').innerHTML = Data.name;
      let newCoordsLong = Data.longitude; 
     document.querySelector('#long').innerHTML = Data.longitude;
       let newCoordsLat = Data.latitude; 
       document.querySelector('#lat').innerHTML = Data.latitude;
     
      api = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${newCoordsLong}&lat=${newCoordsLat}&lang=fr`;       
 fetch(api, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "c3b3f49f1emshd3576acb06653adp10643ajsn2b1dafd36bf6",
		"x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
            }
      }).then((response) =>
                  response.json().then(({data}) => {
             document.querySelector('#cityName').innerHTML = data[0].city_name;
            console.log(data);
                        document.querySelector('#temp').innerHTML = "<i class='fas fa-thermometer-three-quarters'></i></br>" + data[0].temp;
                        document.querySelector('#humidity').innerHTML = "<i class='fas fa-tint'></i></br>" + data[0].rh;

                        document.querySelector('#wind').innerHTML = "<i class='fas fa-wind'></i></br>" + data[0].wind_spd;
                  })
              
            )
      
            .catch((err) => console.log('Erreur : ' + err)); 
      
      })
      
     ).catch((err) => console.log('Erreur : ' + err));
     
 });

});
   
});
