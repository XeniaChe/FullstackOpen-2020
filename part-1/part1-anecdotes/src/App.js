import React, { useState } from 'react';
import './App.css';

const App = (props) => {
	const [ selected, setSelected ] = useState(0);

	const randomNumHandler = () => {
		let random = Math.floor(Math.random() * 6);
		setSelected(random);
	};

	return (
		<div>
			<h2>{props.anecdotes[selected]}</h2>
			<button onClick={randomNumHandler}>next anecdote</button>
		</div>
	);
};

export default App;
