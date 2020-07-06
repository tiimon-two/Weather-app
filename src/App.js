import React from "react";
import Info from "./components/Info";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "55efe181638833b349cdd35ffc23ba87";

class App extends React.Component {

  state = {
    temp: undefined, //температура
    city: undefined, //город
    county: undefined, //страна
    pressure: undefined, //давление
    sunrise: undefined, //восход солнца
    sunset: undefined, //заход солнца
    wind: undefined, //скорость ветра/с
    humidity: undefined, //влажность
    weather_description: undefined, //описание погодных условий (дождь, туман и прч.)
    weather_url: undefined,
    error: undefined //сообщение выводится если не введён город
  }

  gettingWeahter = async (event) => {
    event.preventDefault(); //отключаем обновление страницы при клике по кнопке
    var city = event.target.elements.city.value; //получаем данные о городе запроса из формы

    if(city) { //если город введён
      const api_url = await //запрос на получение данных с api
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`);
      const data = await api_url.json(); //ссылка на данные полученные из api
      const weather = data.weather[0];
      // const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
      if(data.message === "city not found"){
        this.setState({
        error: "Введите корректное название города!"
        })
        return;
      }

      //приводим время захода и восхода солнца к значению чч.мм.сс
      var date_s = new Date(data.sys.sunset*1000); 
      var date_r = new Date(data.sys.sunrise*1000);
      var hours_s = date_s.getHours();
      var minutes_s = "0" + date_s.getMinutes();
      var seconds_s = "0" + date_s.getSeconds();
      var hours_r = date_r.getHours();
      var minutes_r = "0" + date_r.getMinutes();
      var seconds_r = "0" + date_r.getSeconds();
      var sunset_date = hours_s + ':' + minutes_s.substr(-2) + ':' + seconds_s.substr(-2); 
      var sunrise_date = hours_r + ':' + minutes_r.substr(-2) + ':' + seconds_r.substr(-2);

      var pressure = data.main.pressure; //получаем давление
      var pressureInMmHg = Math.floor(pressure * 0.75006); //приводим к значению мм рт.ст.
      this.setState({ //устанавливаем значения вместо неопределенных
      temp: data.main.temp, 
      city: data.name,
      country: data.sys.country,
      pressure: pressureInMmHg,
      sunrise: sunrise_date,
      sunset: sunset_date,
      wind: data.wind.speed,
      humidity: data.main.humidity,
      weather_description: weather.description,
      weather_url: "http://openweathermap.org/img/w/" + weather.icon + ".png",
      error: undefined
       });
     
    } else { //если город не введён выводим сообщение об ошибке
      this.setState({
      temp: undefined,
      city: undefined,
      county: undefined,
      pressure: undefined,
      sunrise: undefined,
      sunset: undefined,
      wind: undefined,
      humidity: undefined,
      weather_description: undefined,
      weather_url: undefined,
      error: "Введите название города!"
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 info">
              <Info />
            </div>
            <div className="col-sm-7 form">
              <Form weatherMethod={this.gettingWeahter} />
              <Weather
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                sunrise={this.state.sunrise}
                sunset={this.state.sunset}
                wind={this.state.wind}
                humidity={this.state.humidity}
                pressure={this.state.pressure}
                weather_description={this.state.weather_description}
                weather_url={this.state.weather_url}
                error={this.state.error}
               />
            </div>             
          </div>
        </div>
      </div>
    </div>
      );
  }
}

export default App;