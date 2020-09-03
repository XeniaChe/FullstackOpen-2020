import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

const App = () => {
	const [ good, setGood ] = useState(0);
	const [ neutral, setNeutral ] = useState(0);
	const [ bad, setBad ] = useState(0);

	const goodClickHandler = () => setGood(good + 1);
	const neutralClickHandler = () => setNeutral(neutral + 1);
	const badClickHandler = () => setBad(bad + 1);

	let total = good + neutral + bad;
	let avarage, positive;
	if (total > 0) {
		avarage = (good - bad) / total;
		positive = good / total * 100;
	} else {
		avarage = 0;
		positive = 0;
	}
	return (
		<div>
			<h1> Give feedback</h1>
			<button onClick={goodClickHandler}>Good</button>
			<button onClick={neutralClickHandler}>Neutral</button>
			<button onClick={badClickHandler}>Bad</button>
			<h1>statistic</h1>
			<p>Good: {good}</p>
			<p>Neutral: {neutral}</p>
			<p>Bad: {bad}</p>
			<p>Total: {total}</p>
			<p>Avarage: {avarage}</p>
			<p>Positive: {positive}%</p>
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
