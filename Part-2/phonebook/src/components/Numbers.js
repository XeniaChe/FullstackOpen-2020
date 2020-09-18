import React from 'react';
import Notification from './Notification';

const Numbers = ({ namesToShow, deleteNumber, message, actionResult }) => {
	let style = actionResult === 'success' ? 'success' : 'error';
	
	return (
		<>
			<Notification message={message} style={style}/>
			<ul>
				{namesToShow.map((el) => (
					<li key={el.name}>
						{el.name} : {el.number}
						<button onClick={() => deleteNumber(el.id)}>delete</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default Numbers;
