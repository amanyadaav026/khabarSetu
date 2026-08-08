import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, articleId } = req.body;

    const newComment = new Comment({
      content,
      articleId,
      userId: req.user.userId,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
};

export const getArticleComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      articleId: req.params.articleId,
    })
      .populate("userId", "username profilePhotoUrl")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (
      comment.userId.toString() !== req.user.userId &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment.",
      });
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate("userId", "username profilePhotoUrl")
      .populate("articleId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};