import { User } from "../models/user.model.js";
import Article from "../models/article.model.js";

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.userId !== req.params.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own account.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePhotoUrl: req.body.profilePhotoUrl,
        },
      },
      { returnDocument: "after" }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password, ...rest } = updatedUser._doc;

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: rest,
    });

  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (
      req.user.userId !== req.params.userId &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this user.",
      });
    }

    await User.findByIdAndDelete(req.params.userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const saveArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (
      !user.savedArticles.some(
        (id) => id.toString() === articleId
      )
    ) {
      user.savedArticles.push(articleId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Article saved successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const unsaveArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.savedArticles = user.savedArticles.filter(
      (id) => id.toString() !== articleId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Article removed from saved list.",
    });
  } catch (error) {
    next(error);
  }
};

export const getSavedArticles = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const savedArticles = await Article.find({
      _id: { $in: user.savedArticles },
    }).sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      savedArticles,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};