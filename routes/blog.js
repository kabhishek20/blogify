const express = require('express');
const router = express.Router();
const multer = require('multer');

const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/uploads/`)
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.originalname;
      cb(null,filename)
    }
  })
  
const upload = multer({ storage: storage })

router.route('/addblog')
    .get((req, res) => {
        return res.render('addblog',{
          user: req.user
        });
    })
    .post(upload.single("coverImageURL"),async(req, res) => {
        // console.log(req.body);
        // console.log(req.file);
        const blog  = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            coverImageURL: `/uploads/${req.file.filename}`,
            createdBy: req.user._id
        })
        // return res.redirect('/');
        return res.redirect(`/blog/${blog._id}`);
    });

router.route('/:id')
.get(async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({blogId: req.params.id}).populate('userId');
    return res.render('blog',{
        user: req.user,
        blog: blog,
        comments: comments
    });
});

router.route('/:id/comment')
.post(async(req, res) => {
    const comment = await Comment.create({
        comment: req.body.comment,
        userId: req.user._id,
        blogId: req.params.id
    });
    return res.redirect(`/blog/${req.params.id}`);
});

module.exports = router;