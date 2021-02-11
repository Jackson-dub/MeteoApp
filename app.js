window.addEventListener('load', () => {

      let lat;
      let long;
      let City;
      let Weather;

      //Affiche les informations de la ville de l'utilisateur
      navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            City = document.querySelector('#cityName');
            long = position.coords.longitude;
            document.querySelector("#long").innerHTML = long;
            lat = position.coords.latitude;
            document.querySelector("#lat").innerHTML = lat;
            ApiCall(long, lat);
            showTime();
            setInterval(showTime, 1000);

      });
      
//Défini la fonction de l'horloge

      function showTime() {
            let date = new Date();

            let hours = date.getHours(); //0 -23
            let minutes = date.getMinutes() // -59
            let seconds = date.getSeconds()
            //0-59

            let formatHours = convertFormat(hours)

            hours = checkTime(hours);

            hours = addZero(hours)
            minutes = addZero(minutes)
            seconds = addZero(seconds)
            document.querySelector('#clock').innerText = `${hours} : ${minutes} : ${seconds} ${formatHours}`
      }

      function convertFormat(time) {
            let format = 'AM'
            if (time >= 12) {
                  format = 'PM'
            }
            return format;
      }

      function checkTime(time) {

            if (time > 12) {
                  time = time - 12;
            }
            if (time === 0) {
                  time = 12;
            }

            return time
      }

      function addZero(time) {
            if (time < 10) {
                  time = "0" + time;
            }
            return time
      }


      // Appel et affiche les informations  de la ville saisie
      function ApiCall(long, lat) {

            //stock l'addresse url de l'API
            let api = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${long}&lat=${lat}&lang=fr`;

            fetch(api, {
                        "method": "GET",
                        "headers": {
                              "x-rapidapi-key": "c3b3f49f1emshd3576acb06653adp10643ajsn2b1dafd36bf6",
                              "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
                        }
                  }).then((response) =>
                        response.json().then(({
                              data
                        }) => {
                              document.querySelector('#cityName').innerHTML = data[0].city_name;
                              console.log(data);
                              document.querySelector('#temp').innerHTML = "<i class='fas fa-thermometer-three-quarters'></i></br>" + data[0].temp;
                              document.querySelector('#humidity').innerHTML = "<i class='fas fa-tint'></i></br></br>" + data[0].rh;

                              document.querySelector('#wind').innerHTML = "<i class='fas fa-wind'></i></br>" + data[0].wind_spd;

                              document.querySelector('#ciel').innerHTML = data[0].weather.description;
                  
                   
                  //Récupère les éléments dynamique dans le DOM 
                  let animation = document.querySelectorAll('#anim img');
                  let canvas = document.querySelector('#weather');
                  let bg =document.querySelectorAll('#weather svg');
                  
                  console.log(bg);
                  // Adapte les animations en fonction du temps
                  
                  switch (data[0].weather.description) {
                  case 'Soleil':
                        animation[0].style.display = 'block';
                        animation[1].style.display = 'none';
                        animation[2].style.display = 'none';
                        animation[3].style.display = 'none';
                        bg[2].style.display = 'none';
                        bg[1].style.display = 'none';
                        bg[0].style.display = 'none';
                        break
                  case  'Neige légère':
                        animation[1].style.display = 'block';
                        animation[0].style.display = 'none';
                        animation[2].style.display = 'none';
                        animation[3].style.display = 'none';
                        bg[0].style.display = 'block';
                        bg[1].style.display = 'none';
                        bg[2].style.display = 'none';
                        break
                  case 'pluie':
                       animation[2].style.display = 'block';
                        bg[1].style.display = 'block';
                        bg[2].style.display = 'none';
                        bg[0].style.display = 'none';
                        animation[3].style.display = 'none';
                        animation[0].style.display = 'none';
                        animation[1].style.display = 'none';
                        break
                  default:
                        animation[3].style.display = 'block';
                        bg[2].style.display = 'block';
                        bg[1].style.display = 'none';
                        bg[0].style.display = 'none';
                        animation[0].style.display = 'none';
                        animation[2].style.display = 'none';
                        animation[1].style.display = 'none';
                        return
            }

                        })

                  )

                  .catch((err) => console.log('Erreur : ' + err));
      }


      document.querySelector('form').addEventListener('submit', (e) => {

            // enlève le comportement par défault
            e.preventDefault();

            //récupère l'information en input
            let ville = document.querySelector('#inputCity').value;

            //Appel et convreti le nom des villes en coordonnées.
            fetch(`https://geohub3.p.rapidapi.com/cities/search/${ville}?pageSize=10&page=1`, {
                        "method": "GET",
                        "headers": {
                              "x-rapidapi-key": "c3b3f49f1emshd3576acb06653adp10643ajsn2b1dafd36bf6",
                              "x-rapidapi-host": "geohub3.p.rapidapi.com"
                        }
                  })
                  .then((response) => response.json().then(({
                        data
                  }) => {
                        let Data = data.cities[0];
                        document.querySelector('#cityName').innerHTML = Data.name;
                        let newCoordsLong = Data.longitude;
                        document.querySelector('#long').innerHTML = Data.longitude;
                        let newCoordsLat = Data.latitude;
                        document.querySelector('#lat').innerHTML = Data.latitude;

                        //Redefinition des variables
                        lat = Data.latitude;
                        long = Data.longitude;

                        //Appel de la function

                        ApiCall(long, lat)

                  })).catch((err) => console.log('Erreur : ' + err));


      });
});
