const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp_real_val = document.getElementById("temp_real_val");
const dataHide = document.querySelector(".middle_layer");


const getInfo = async (event) => {
    event.preventDefault();
     let cityVal = cityName.value;
     if(cityVal === ""){
        city_name.innerText = 'please write the name before search';
        dataHide.classList.add('data_hide');
     }
     else{
         try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=6e9c4457c4ef5f9b536e726f5a029652`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            temp_status.innerText = arrData[0].weather[0].main;

            const tempMood = arrData[0].weather[0].main;
            if(tempMood == "Clear"){
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }
            else if(tempMood == "Clouds"){
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #eccc68;'></i>";
            }
            else if(tempMood == "Rain"){
                temp_status.innerHTML = "<i class='fas fa-rain' style='color: #eccc68;'></i>";
            }
            else{
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }

            const getCurrentDay = () =>{
                let weekDay = new Array(7);
                weekDay[0] = "Sunday";
                weekDay[1] = "Monday";
                weekDay[2] = "Tuesday";
                weekDay[3] = "Wednesday";
                weekDay[4] = "Thursday";
                weekDay[5] = "Friday";
                weekDay[6] = "Saturday";
                let currentTime = new Date();
                let days = weekDay[currentTime.getDay()];
                let day = document.getElementById("day");
                day.innerText = days;
            };
            getCurrentDay();


            const getCurrentTime = () => {
                var months = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ];
                var now = new Date();
                var hours = now.getHours();
                var mins = now.getMinutes();

                var month = months[now.getMonth()];
                var date = now.getDate();

                let today_date = document.getElementById("today_date");
                today_date.innerText = `${date} ${month}`;
            }
            getCurrentTime();




            dataHide.classList.remove('data_hide');
         }
         catch{
             city_name.innerText = "Please enter the city name properly";
             dataHide.classList.add("data_hide");
         }
        
     }

}

submitBtn.addEventListener('click', getInfo);