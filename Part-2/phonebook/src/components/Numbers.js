import React from 'react';

const Numbers = ({ namesToShow, deleteNumber }) => {
	return (
		<ul>
			{namesToShow.map((el) => (
				<li key={el.name}>
					{el.name} : {el.number}
					<button onClick={() => deleteNumber(el.id)}>delete</button>
				</li>
			))}
		</ul>
	);
};

export default Numbers;
