import React, { useState } from 'react';
import './App.css';

const App = (props) => {
	const [ selected, setSelected ] = useState(0);
	const [ votes, setVotes ] = useState(new Array(6).fill(0));

	const randomNumHandler = () => {
		let random = Math.floor(Math.random() * 6);
		setSelected(random);
	};

	const setVotesHandler = () => {
		let newVotes = [ ...votes ];
		newVotes[selected] += 1;
		setVotes(newVotes);
	};

	let bestAnecdote = null;
	let bestIndex = 0;
	for (let vote of votes) {
		if (vote > votes[bestIndex]) {
			bestIndex = votes.indexOf(vote);
		}
	}

	let votesSum = 0;
	for (let vote of votes) {
		votesSum += vote;
	}

	if (votesSum > 0) {
		bestAnecdote = (
			<p>
				{' '}
				{props.anecdotes[bestIndex]}{' '}
				<strong>Has {votes[bestIndex]} votes</strong>
			</p>
		);
	}

	return (
		<div>
			<h2>Anecdot of the day</h2>
			<p>{props.anecdotes[selected]}</p>
			<button onClick={setVotesHandler}>vote</button>
			<button onClick={randomNumHandler}>next anecdote</button>
			<h2>Anecdot with most votes</h2>
			{bestAnecdote}
		</div>
	);
};

export default App;
