import React from 'react';

const Numbers = ({ namesToShow }) => {
	return (
		<ul>
			{namesToShow.map((el) => (
				<li key={el.name}>
					{el.name} : {el.number}
				</li>
			))}
		</ul>
	);
};

export default Numbers;
