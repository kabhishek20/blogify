require('dotenv').config()

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');

const Blog = require('./models/Blog');

const { checkAuthentication } = require('./middlewares/authentication');

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Database connected');
})
.catch(err => {
    console.log('Database connection error', err);
})

const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(checkAuthentication('token'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
  const allBlog = await Blog.find({}).sort({createdAt: -1});
  return res.render('home',
    {
      user: req.user,
      allBlog: allBlog
    }
  );
})

app.use('/user', userRoutes);
app.use('/blog', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})