import React from 'react';

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
};

const Content = ({course}) => {
  const keyCreate = (num) => {
    return Math.random() * Math.floor(num)
  };

  let parts = course.parts.map((el, index) => <Part part={el} key={keyCreate(course.parts.length)}/>);

  return (
    <div>
      {parts}
    </div>
  );
};

export default Content;



  