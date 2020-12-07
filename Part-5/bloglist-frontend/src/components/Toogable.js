import React, { useState } from 'react';

const Toogable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideIfVisible = { display: visible ? 'none' : '' };
  const showIfVisible = { display: visible ? '' : 'none' };

  const toogleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideIfVisible}>
        <button onClick={toogleVisibility}>new note</button>
      </div>
      <div style={showIfVisible}>
        {props.children}
        <button onClick={toogleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default Toogable;
