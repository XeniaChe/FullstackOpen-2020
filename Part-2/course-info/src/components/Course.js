import React from 'react';


const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
}

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

  let parts = course.parts.map(el => <Part part={el} key={keyCreate(course.parts.length)}/>);

  return (
    <div>
      {parts}
    </div>
  );
};

const Total = ({course}) => {
    const total = course.parts.reduce((acc, value) => acc+value.exercises, 0);
  
    return(
      <p><strong>Number of {total} exercises</strong></p>
    ) 
};


const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    );
};

export default Course;