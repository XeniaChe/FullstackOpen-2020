import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import logInService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    let loggedUserJson = window.localStorage.getItem('loggedInUserJson');

    if (loggedUserJson) {
      let user = JSON.parse(loggedUserJson);
      setUser(user);
    }
  }, []);

  const logInHandler = async (event) => {
    event.preventDefault();

    const user = await logInService.logIn({ userName, password });
    setUser(user);

    window.localStorage.setItem('loggedInUserJson', `${JSON.stringify(user)}`);
  };

  const logOutHandler = () => {
    window.localStorage.removeItem('loggedInUserJson');
    setUser(null);
  };

  const showLoginForm = () => (
    <div>
      <h2> Loo in to application</h2>
      <form onSubmit={logInHandler}>
        <input
          type='text'
          name='name'
          onInput={({ target }) => {
            setUserName(target.value);
          }}
        />
        <input
          type='password'
          name='password'
          onInput={({ target }) => {
            setPassword(target.value);
          }}
        />
        <button type='submit'>Log in</button>
      </form>
    </div>
  );

  const showBlogs = () => (
    <div>
      {' '}
      <h2>{userName} is logged-in</h2>
      <button onClick={logOutHandler}>log out</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? showLoginForm() : showBlogs()}
    </div>
  );
};

export default App;
