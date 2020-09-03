import React from 'react';

const Statistics = ({ good, neutral, bad }) => {
	let total = good + neutral + bad;
	let avarage, positive;
	if (total > 0) {
		avarage = (good - bad) / total;
		positive = good / total * 100;
	} else {
		avarage = 0;
		positive = 0;
	}
	let statistics;

	if (good === 0 && neutral === 0 && bad === 0) {
		statistics = <h2>No feedback given</h2>;
	} else {
		statistics = (
            <>
            	<h1>statistics:</h1>
				<p>Good: {good}</p>
				<p>Neutral: {neutral}</p>
				<p>Bad: {bad}</p>
				<p>Total: {total}</p>
				<p>Avarage: {avarage}</p>
				<p>Positive: {positive}%</p>
            </>
			
		);
	}
	return <div>{statistics}</div>;
};

export default Statistics;
