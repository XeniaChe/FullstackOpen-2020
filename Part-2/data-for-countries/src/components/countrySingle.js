import React from 'react';

const countrySingle = ({filteredCountries,  weatherData, searchQuery}) => {
    	////Single Country Render
	//wether
	let weather =
    weatherData.loaded && weatherData.data ? (
        <div>
            <p>
                <strong>temperature:</strong> {weatherData.data.temperature}{' '}
                Celsius
            </p>
            {weatherData.data.weather_icons.map((el, index) => (
                <img key={index} alt='wether icon' src={el} />
            ))}
            <p>
                <strong>Wind:</strong> {weatherData.data.wind_speed}{' '}
                Kilometers/Hour
            </p>
            <p>
                <strong>direction:</strong> {weatherData.data.wind_dir}
            </p>
        </div>
    ) : null;
//main
let contrySingle =
    filteredCountries.length > 0 && searchQuery.length > 0 ? (
        <div>
            <h2>{filteredCountries[0].name} </h2>
            <p>capital: {filteredCountries[0].capital}</p>
            <p>population: {filteredCountries[0].population}</p>
            <h2>Languages:</h2>

            <ul>
                {filteredCountries[0].languages.map((el) => (
                    <li key={el.iso639_1}>{el.name}</li>
                ))}
            </ul>
            <img
                src={filteredCountries[0].flag}
                length='150px'
                height='150px'
                alt='country flag'
            />
            <h2>Weather in {filteredCountries[0].capital}</h2>

            {weather}
        </div>
    ) : null;

    return (
        <>{contrySingle} </>
    );
};

export default countrySingle;