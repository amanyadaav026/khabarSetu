import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleAuth from "@/components/shared/GoogleAuth";

import axios from "axios";

const formSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can contain only letters, numbers and underscore"
      ),

    email: z
      .string()
      .trim()
      .email("Enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 64 characters")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /[0-9]/,
        "Password must contain at least one number"
      )
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values) => {
    try{

      const { confirmPassword, ...userData } = values;

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
         userData
      );



      alert("Signup Successful!");

      reset();

      navigate("/sign-in", { replace: true });

      // Baad me yaha navigate("/sign-in") karenge

    } catch (error){
      console.error(error.response?.data || error.message);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-start pt-14">
      <div className="flex p-3 max-w-3xl sm:max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-12">
        {/* Left */}
        <div className="flex-1">
          <Link
            to="/"
            className="font-bold text-2xl sm:text-4xl flex flex-wrap"
          >
            <span className="text-gray-900">khabar</span>
            <span className="text-red-600">Setu</span>
          </Link>

          <div className="w-20 h-1 rounded-full bg-linear-to-r from-gray-900 to-red-600 mt-4"></div>

          <p className="mt-6 text-lg md:text-xl font-semibold text-slate-700">
            Connecting You to Every Story
          </p>

          <p className="mt-4 text-sm md:text-base text-slate-500 leading-7 max-w-md">
            Stay informed with trusted news from across India.
            Join KhabarSetu and never miss the stories that matter most.
          </p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6"
          >
            <h2 className="text-3xl font-bold text-center">
              Create Account
            </h2>

            <p className="text-center text-gray-500 text-sm mb-8">
              Join KhabarSetu today
            </p>

            <div>
              <Input
                type="text"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" 
                    className="w-full bg-linear-to-r from-gray-900 to-red-600 text-white transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-orange-600">
               Create Account
            </Button>

            <GoogleAuth />

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;