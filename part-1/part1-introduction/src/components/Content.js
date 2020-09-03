import React from 'react';
import Part from './part/Part';

const Content = (props) => {
    return (
        <>
        <Part name={props.parts[0].name} exercises={props.parts[0].exercise}/>
        <Part name={props.parts[1].name} exercises={props.parts[1].exercise}/>
        <Part name={props.parts[2].name} exercises={props.parts[2].exercise}/>
        </>
    )
}

export default Content;
