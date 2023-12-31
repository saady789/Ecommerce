//Signup.js
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createUserAsync } from "./features/auth/authSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { refresh, storeUser, logger } from "./features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    data = {
      ...data,
      image:
        "https://blogtimenow.com/wp-content/uploads/2014/06/hide-facebook-profile-picture-notification.jpg",
    };
    let x = await dispatch(createUserAsync(data));
    console.log(x.payload);
    if (x.payload == "Sorry a user already exists with this email") {
      toast.error(
        "This email is already in use. Try another email or logging in",
        {
          position: toast.POSITION.TOP_RIGHT, // Position of the notification
          autoClose: 3000, // Time in milliseconds after which the notification will be automatically closed
          hideProgressBar: false, // Whether to show the progress bar
          closeOnClick: true, // Whether to close the notification when clicked
          pauseOnHover: true, // Whether to pause the autoClose timer when hovering over the notification
          // Other options
        }
      );
    } else {
      toast.success("Account Created", {
        position: toast.POSITION.TOP_RIGHT, // Position of the notification
        autoClose: 3000, // Time in milliseconds after which the notification will be automatically closed
        hideProgressBar: false, // Whether to show the progress bar
        closeOnClick: true, // Whether to close the notification when clicked
        pauseOnHover: true, // Whether to pause the autoClose timer when hovering over the notification
        // Other options
      });
      dispatch(refresh());
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                UserName
              </label>
              <div className="mt-2">
                <input
                  {...register("name", {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                  })}
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", { required: true, minLength: 3 })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  {...register("cpassword", {
                    required: true,
                    minLength: 3,
                    validate: (value, formValues) =>
                      value === watch("password"),
                  })}
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
          <p>
            Already a user?<Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
