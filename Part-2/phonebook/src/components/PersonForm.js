import React from 'react';

const PersonForm = (props) => {
	return (
		<form onSubmit={props.submit}>
			<div>
				name: <input onChange={props.input} />
			</div>
			<div>
				number: <input onChange={props.input} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
			{/* <div>debug: {newName}</div> */}
		</form>
	);
};

export default PersonForm;
