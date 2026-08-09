import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { signInSuccess } from "@/app/user/userSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleAuth from "@/components/shared/GoogleAuth";

import axios from "axios";

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signin`,
        values,
        {
          withCredentials: true,
        }
      );

      dispatch(
         signInSuccess({
          ...res.data.user,
          token: res.data.token,
        })
      );
      

      alert("Sign In Successful!");
      navigate("/dashboard");

      // Later:
      // localStorage.setItem("token", res.data.token);
      // navigate("/dashboard");

    } catch (error) {
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
            Welcome Back!
          </p>

          <p className="mt-4 text-sm md:text-base text-slate-500 leading-7 max-w-md">
            Sign in to continue reading trusted news from across India.
            Stay connected with the stories that matter most.
          </p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6"
          >
            <h2 className="text-3xl font-bold text-center">
              Sign In
            </h2>

            <p className="text-center text-gray-500 text-sm mb-8">
              Welcome back to KhabarSetu
            </p>

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

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-gray-900 to-red-600 text-white transition-all duration-300 hover:scale-[1.02] hover:from-gray-900 hover:to-red-700"
            >
              Sign In
            </Button>

            <GoogleAuth />

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-blue-600 hover:underline font-medium"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;