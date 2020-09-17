import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import Countrysingle from './components/countrySingle';
import Countrylist from './countryList';

const App = () => {
	const [ countries, setCountries ] = useState([]);

	const [ searchQuery, setSearchQuery ] = useState('');

	const [ showView, setShowView ] = useState({ show: false });

	const [ weatherData, setWeatherData ] = useState({
		data: null,
		loaded: false
	});

	//Initial countries load
	useEffect(() => {
		const loadData = async () => {
			try {
				let res = await axios.get(
					`https://restcountries.eu/rest/v2/all`
				);
				setCountries(res.data);
			} catch (error) {
				console.log(error.message);
			}
		};
		loadData();
	}, []);

	//reset showView condition on query change to search index of pressed el-t in the new filtered countries list
	useEffect(
		() => {
			return setShowView({ show: false });
		},
		[ searchQuery ]
	);

	const setSearchQueryHandler = (event) => {
		let inputData = event.target.value;
		setSearchQuery(inputData);
	};

	//Filter countries after query set
	let filteredCountries = countries.filter((el) =>
		el.name.toLowerCase().includes(searchQuery)
	);

	//Get weather data handler
	const loadWeatherData = async (location) => {
		const config = {
			access_key: process.env.REACT_APP_API_KEY,
			query: location,
			unit: 'm'
		};
		try {
			const res = await axios('http://api.weatherstack.com/current', {
				params: { ...config }
			});
			console.log(res.statusText);
			if (res.statusText === 'OK') {
				setWeatherData({ data: res.data.current, loaded: true });
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Define the Capital for weather  location
	let singleCountryCapital;
	if (
		searchQuery.length > 0 &&
		filteredCountries.length > 0 &&
		filteredCountries.length <= 1
	) {
		singleCountryCapital = filteredCountries[0].capital;
	}

	//Call weather data handler with location =  country's capital
	useEffect(
		() => {
			loadWeatherData(singleCountryCapital);
		},
		[ singleCountryCapital ]
	);

	//Button  Show Country Preview Handler
	const showCountryDetailHandler = (code) => {
		let index = filteredCountries.findIndex(
			(el) => el.numericCode === code
		);
		setShowView({ show: true, code: code, index: index });
	};

	return (
		<div>
			find countries : <input onChange={setSearchQueryHandler} />
			<div>
				<h2>countries</h2>
				{filteredCountries.length > 1 ? (
					<Countrylist
						filteredCountries={filteredCountries}
						searchQuery={searchQuery}
						showView={showView}
						showCountryDetailHandler={showCountryDetailHandler}
					/>
				) : (
					<Countrysingle
						filteredCountries={filteredCountries}
						weatherData={weatherData}
						searchQuery={searchQuery}
					/>
				)}
			</div>
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
