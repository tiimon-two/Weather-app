import React from "react";

const Weather = props => (
		<div className="infoWeath">
			{props.city &&
				<div>
				<p>Местоположение: {props.city}, {props.country}</p>
				<p>{props.weather_description} <img src={props.weather_url} alt={props.weather_description}/></p>
				<p>Температура: {props.temp} °C</p>
				<p>Скорость ветра: {props.wind} м/c</p>
				<p>Влажность: {props.humidity} %</p>
				<p>Восход солнца: {props.sunrise}</p>
				<p>Заход солнца: {props.sunset}</p>
				<p>Давление: {props.pressure} мм рт.ст.</p>								
				</div>				 
			}
			<p className="error">{props.error}</p>				
		</div>
	);

export default Weather;