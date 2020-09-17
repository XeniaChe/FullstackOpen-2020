import React from 'react';

const CountryList = ( {filteredCountries, searchQuery, showView, showCountryDetailHandler }) => {
	//Country Preview
	let countryView =
		showView.show && showView.index < filteredCountries.length ? (
			<div>
				<h2>{filteredCountries[showView.index].name} </h2>
				<p>capital: {filteredCountries[showView.index].capital}</p>
				<p>
					population: {filteredCountries[showView.index].population}
				</p>
				<h2>Languages:</h2>

				<ul>
					{filteredCountries[showView.index].languages.map((el) => (
						<li key={el.iso639_1}>{el.name}</li>
					))}
				</ul>
				<img
					src={filteredCountries[showView.index].flag}
					length='150px'
					height='150px'
					alt='country flag'
				/>
			</div>
		) : null;

	//Countries List Render
	let countryList = (
		<ul>
			{filteredCountries.map((el) => (
				<li key={el.numericCode}>
					{el.name} {' '}
					{searchQuery.length > 0 ? (
						<button
							onClick={() =>
								showCountryDetailHandler(el.numericCode)}
						>
							show
						</button>
					) : null}
					{showView.code === el.numericCode ? countryView : null}
				</li>
			))}
		</ul>
	);

	if (searchQuery.length > 0 && filteredCountries.length > 10) {
		countryList = <p> too many matches, specify another filter</p>;
	}

	
    return (
    <>{countryList}</>
    );
};

export default CountryList;