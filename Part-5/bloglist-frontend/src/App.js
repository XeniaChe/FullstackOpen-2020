import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import logInService from './services/login';
// import * as classes from './App.css';
import './App.css';
import BlogForm from './components/BlogForm';
import Toogable from './components/Toogable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [showNotifSuccess, setShowNotifSuccess] = useState(false);
  const [showNotifError, setShowNotifError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  //checking if user has alredy been logged-in
  useEffect(() => {
    //get logged-in user to localStorage
    let loggedUserJson = window.localStorage.getItem('loggedInUserJson');

    if (loggedUserJson) {
      //parse back stringified user to JS object
      let user = JSON.parse(loggedUserJson);
      setUser(user);
    }
  }, []);

  const notifSuccses = (message) => {
    return (
      <div className='Success'>
        <h2>{message}</h2>
      </div>
    );
  };

  const clearNotif = () => {
    setTimeout(() => {
      setShowNotifError(false);
      setShowNotifSuccess(false);
    }, 2000);
  };

  const notifError = (errorMessage) => {
    return (
      <div className='Err'>
        <h2>{errorMessage}</h2>
      </div>
    );
  };
  const logInHandler = async (event) => {
    event.preventDefault();

    try {
      const user = await logInService.logIn({ userName, password });
      setUser(user);
      setShowNotifSuccess(true);
      setSuccessMessage(`${user.name} logged-in`);
      //save logged-in user to localStorage
      window.localStorage.setItem(
        'loggedInUserJson',
        `${JSON.stringify(user)}`
      );
    } catch (error) {
      console.log(error);
      setShowNotifError(true);
      setErrorMessage(`${error.response.data.error}`);
    }
    clearNotif();
  };

  //LogOut and remove user and TOKEN from localStorage
  const logOutHandler = () => {
    window.localStorage.removeItem('loggedInUserJson');
    setUser(null);
  };

  const sendNewBlogHandler = async (blog, clear) => {
    try {
      const newBlogReturned = await blogService.sendNewBlog(blog);
      console.log(`new blog sent`);
      clear();
      setShowNotifSuccess(true);
      setSuccessMessage(
        `A new blog: ${newBlogReturned.title} by ${newBlogReturned.author}added.`
      );
    } catch (error) {
      console.log(error.response.data.error);
      setShowNotifError(true);
      setErrorMessage(`${error.response.data.error}`);
    }
    clearNotif();
  };

  const showLoginForm = () => (
    <div>
      <h2> Log-in into application</h2>
      <form onSubmit={logInHandler}>
        <label htmlFor='userName'>User name:</label>
        <input
          id='userName'
          type='text'
          name='name'
          onInput={({ target }) => {
            setUserName(target.value);
          }}
        />
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
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
      <h4>{user.username} is logged-in</h4>
      <button onClick={logOutHandler}>log out</button>
      <Toogable>
        <BlogForm sendBlog={sendNewBlogHandler} />
      </Toogable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      {showNotifSuccess && notifSuccses(successMessage)}
      {showNotifError && notifError(errorMessage)}
      {user === null ? showLoginForm() : showBlogs()}
    </div>
  );
};

export default App;
