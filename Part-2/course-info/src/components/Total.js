import React from 'react';

const Total = ({course}) => {

    let sum = 0;
    for (const part of course.parts) {
        sum += part.exercises;
    };

    return(
      <p>Number of exercises {sum}</p>
    ) 
};

export default Total;
