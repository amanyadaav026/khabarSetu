import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (
            !username?.trim() ||
            !email?.trim() ||
            !password?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Password length validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        // Save user
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Signup successful"
        });

    } catch (error) {
        next(error);
    }
};

export const signinUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Find user
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
              userId: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          })
          .json({
            success: true,
            message: "Signin successful",
            user: {
              _id: user._id,
              username: user.username,
              email: user.email,
              profilePhotoUrl: user.profilePhotoUrl,
              isAdmin: user.isAdmin,
            },
          });

    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
  const { email, name, profilePhotoUrl } = req.body;

  try {
    // Validate request
    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Email and name are required",
      });
    }

    // Check if user already exists
    let user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Existing Google/User account
    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .json({
          success: true,
          message: "Google Sign In Successful",
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePhotoUrl: user.profilePhotoUrl,
            isAdmin: user.isAdmin,
          },
        });
    }

    // Generate random password
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create unique username
    let username = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");

    while (await User.findOne({ username })) {
      username = `${username}${Math.floor(Math.random() * 10000)}`;
    }

    // Create new Google user
    user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      profilePhotoUrl,
    });

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        success: true,
        message: "Google Signup Successful",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePhotoUrl: user.profilePhotoUrl,
          isAdmin: user.isAdmin,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({
        success: true,
        message: "Sign out successful",
      });
  } catch (error) {
    next(error);
  }
};