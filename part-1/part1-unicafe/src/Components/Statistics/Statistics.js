import React from 'react';
import Statistic from './statistic/statistic';
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
                <Statistic text='Good' value={good}/>
                <Statistic text='Neutral' value={neutral}/>
                <Statistic text='Bad' value={bad}/>
                <Statistic text='Total' value={total}/>
                <Statistic text='Avarage' value={avarage}/>
                <Statistic text='Positive' value={positive}/>
            </>
			
		);
	}
	return <div>{statistics}</div>;
};

export default Statistics;
