import React from 'react';

const Total = (props) => {
	let total = 0;
	for (let part of props.parts) {
		total += part.exercise;
	}
	return <p>The exercises total number is: {total}</p>;
};
export default Total;
