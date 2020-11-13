const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { body } = request;
  const { password } = body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    // DO NOT SEND/STORE USER'S PASSWORD IN DB!!!
    // password: body.password,
    passwordHash,
  });

  // IF PASSWORD IS TOO SHORT
  if (password.length < 3) {
    return response.status(400).json({ error: 'password is to short' });
  }

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  });

  response.json(users.map((el) => el.toJSON()));
});

module.exports = usersRouter;
