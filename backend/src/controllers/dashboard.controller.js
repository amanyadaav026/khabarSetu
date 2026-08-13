import Article from "../models/article.model.js";
import { User } from "../models/user.model.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalArticles = await Article.countDocuments({
      author: req.user.userId,
    });

    const user = await User.findById(req.user.userId);

    const savedArticles = await Article.countDocuments({
      _id: { $in: user.savedArticles },
    });


    const viewsResult = await Article.aggregate([
      {
        $match: {
            author: user._id,
        },
      },
      {
        $group: {
          _id: null,
          totalViews: {
            $sum: "$views",
          },
        },
       },
    ]);

    const totalViews =
      viewsResult.length > 0 ? viewsResult[0].totalViews : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalArticles,
        savedArticles,
        totalViews,
      },
    });
  } catch (error) {
    next(error);
  }
};