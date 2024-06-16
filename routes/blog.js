const { Router } = require("express");
const multer = require("multer");
const router = Router();
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    // const fileName = `${Date.now()}-${file.originalname}`;
    // cb(null, fileName);
    return cb(null, `${Date.now()}- ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  console.log(blog);
  return res.render("blog", {
    user: req.user,
    blog,
  });
});

router.post('/comment/:blogId',async (req,res) =>{
  const comment = await Comment.create({
    content:res.body.content,
    blogId:req.params.blogId,
    createdBy:req.user._id,
  })

  return res.redirect(`/blog/${req.params.blogId}`)
})

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  console.log(req.body);
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
