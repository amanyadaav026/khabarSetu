import Article from "../models/article.model.js";

export const createArticle = async (req, res) => {
  try {
    const { title, summary, category, content, imageUrl } = req.body;

    // Basic validation
    if (!title || !summary || !category || !content || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const article = new Article({
      title,
      summary,
      category,
      content,
      imageUrl,

      // Temporary value
      // Later this will come from the logged-in user (JWT)
      author: req.user.userId,
      status: "pending",
    });

    await article.save();

    return res.status(201).json({
      success: true,
      message: "Article created successfully.",
      article,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserArticles = async (req, res) => {
  try {
    const articles = await Article.find({
      author: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      articles,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    if (
      article.author.toString() !== req.user.userId &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this article.",
      });
    }

    await Article.findByIdAndDelete(req.params.articleId);

    return res.status(200).json({
      success: true,
      message: "Article deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can access only your own articles.",
      });
    }

    return res.status(200).json({
      success: true,
      article,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    if (
      article.author.toString() !== req.user.userId &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this article.",
      });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.articleId,
      {
        title: req.body.title,
        summary: req.body.summary,
        category: req.body.category,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Article updated successfully.",
      article: updatedArticle,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({
      status: "approved",
    })
      .populate("author", "username profilePhotoUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      articles,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleArticle = async (req, res, next) => {
  try {
    const article = await Article.findOneAndUpdate(
      {
        _id: req.params.articleId,
        status: "approved",
      },
      {
        $inc: {
          views: 1,
        },
      },
      {
        returnDocument: "after",
      }
    ).populate("author", "username profilePhotoUrl");

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    res.status(200).json({
      success: true,
      article,
    });
  } catch (error) {
    next(error);
  }
};

export const searchArticles = async (req, res, next) => {
  try {
    const { query = "", category = "All" } = req.query;

    const filter = {
      status: "approved",
    };

    // Search filter
    if (query) {
      filter.$or = [
        {
          title: {
            $regex: query,
            $options: "i",
          },
        },
        {
          summary: {
            $regex: query,
            $options: "i",
          },
        },
      ];
    }

    // Category filter
    if (category !== "All") {
      filter.category = category;
    }

    const articles = await Article.find(filter)
      .populate("author", "username profilePhotoUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      articles,
    });

  } catch (error) {
    next(error);
  }
};

export const approveArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.articleId,
      { status: "approved" },
      { returnDocument: "after"}
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Article approved successfully.",
      article,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const rejectArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.articleId,
      { status: "rejected" },
      { returnDocument: "after" }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Article rejected successfully.",
      article,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPendingArticles = async (req, res) => {
  try {
    const articles = await Article.find({
      status: "pending",
    })
      .populate("author", "username profilePhotoUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      articles,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};