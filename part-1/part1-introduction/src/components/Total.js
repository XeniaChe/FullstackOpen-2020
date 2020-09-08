import React from 'react';

const Total = (props) => {
	let total =
		props.parts[0].exercise +
		props.parts[1].exercise +
		props.parts[2].exercise;
	return <p>The exercises total number is: {total}</p>;
};
export default Total;
