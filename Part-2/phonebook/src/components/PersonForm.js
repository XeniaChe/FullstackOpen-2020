import React from 'react';

const PersonForm = (props) => {
	return (
		<form onSubmit={props.submit}>
			<div>
				name: <input onChange={props.inputName} />
			</div>
			<div>
				number: <input onChange={props.inputNumber} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export default PersonForm;
