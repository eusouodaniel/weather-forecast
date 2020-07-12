import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [location, setLocation] = useState(false);
	const [weather, setWeather] = useState(false);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			getWeather(position.coords.latitude, position.coords.longitude);
			setLocation(true);
		})
	})

	let getWeather = async (lat, long) => {
		let weather = await axios.get(process.env.REACT_APP_WEATHER_URL, {
			params: {
				lat: lat,
				lon: long,
				appid: process.env.REACT_APP_WEATHER_KEY,
				lang: 'pt',
				units: 'metric'
			}
		})
		setWeather(weather.data);
	}

	if (location == false) {
		return (
			<Fragment>
				Preciso que você permita que eu acesse a sua localização :)
			</Fragment>
		);
	} else if (weather == false) {
		return (
			<Fragment>
				Buscando o clima
			</Fragment>
		);
	} else {
		return (
			<Fragment>
				<h3>Clima baseado nas sua atual situação - { weather['weather'][0]['description'] }</h3>
				<hr />
				<ul>
					<li>Temperatura atual: { weather['main']['temp'] }</li>
					<li>Temperatura máxima: { weather['main']['temp_max'] }</li>
					<li>Temperatura mínima: { weather['main']['temp_min'] }</li>
				</ul>
			</Fragment>
		);
	}
}

export default App;
