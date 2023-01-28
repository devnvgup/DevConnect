const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route   Post api/Posts
// @desc    Create a post

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      const post = await new Post(newPost);
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Server Error");
    }
  }
);

// @route   Get api/Posts
// @desc    Get all post

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) return res.status(400).json("There is no post");
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

// @route   Get api/Posts/:id
// @desc    Get id post

router.get("/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (!posts) return res.status(400).json("There is no post");
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

// @route   Delete api/Posts
// @desc    delete post

router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorizes" });
    }
    await post.remove();
    res.json("Deleted Post");
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

// @route   PUT api/Posts/like/:id
// @desc   like a post

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if the post has been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json("Post alreadly liked");
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
