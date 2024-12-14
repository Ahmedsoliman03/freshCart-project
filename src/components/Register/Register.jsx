import React, { useContext, useEffect, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../../context/UserContext";
import { Helmet } from "react-helmet";
export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  let { setUserLogin } = useContext(UserContext);

  async function handleRegister(formik) {
    setLoading(true);
    // console.log(formik); //return obj with value
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formik)
      .then((response) => {
        if (response.data.message == "success") {
          navigate("/");
          setLoading(false);
          localStorage.setItem("userToken", response.data.token);
          setUserLogin(response.data.token);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  }
  let yupValidation = yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[A-Z][a-z]{2,8}$/,
        "name must be uppercase and 3-8 characters long"
      )
      .required("name is required"),
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "password must be minimum eight characters, at least one letter and one number"
      )

      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "password and repassword must be same"
      )
      .required("repassword is required"),
    phone: yup
      .string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "phone is invalid")
      .required("phone is required"),
  });

  // function myValidate(formik) {
  //   // console.log(formik); // return obj with value

  //   let errors = {};
  //   if (!formik.name) {
  //     errors.name = "name is required";
  //   } else if (!/^[A-Z][a-z]{2,8}$/.test(formik.name)) {
  //     errors.name = "name must be uppercase and 3-8 characters long";
  //   }
  //   if (!formik.email) {
  //     errors.email = "email is required";
  //   } else if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(formik.email)) {
  //     errors.email = "Email is invalid";
  //   }
  //   if (!formik.phone) {
  //     errors.phone = "phone is required";
  //   } else if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formik.phone)) {
  //     errors.phone = "phone is invalid";
  //   }
  //   if (!formik.password) {
  //     errors.password = "password is required";
  //   } else if (
  //     !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formik.password)
  //   ) {
  //     errors.password =
  //       "password must be minimum eight characters, at least one letter and one number:";
  //   }
  //   if (!formik.rePassword) {
  //     errors.rePassword = "repassword is required";
  //   } else if (formik.rePassword !== formik.password) {
  //     errors.rePassword = "repassword not confirm with password";
  //   }
  //   return errors;
  // }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate: myValidate,
    validationSchema: yupValidation,
    onSubmit: handleRegister,
  });
  useEffect(() => {}, []);
  return (
    <>
      <Helmet>
        <title>Register Now</title>
      </Helmet>
      <div className="py-6 max-w-lg mx-auto p-5 md:p-0">
        {error && (
          <div
            class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        )}
        <h2 className="text-3xl font-bold mb-6 text-green-600">Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Name
            </label>
            {formik.errors.name && formik.touched.name && (
              <div
                class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
              </div>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Email
            </label>
            {formik.errors.email && formik.touched.email && (
              <div
                class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="phone"
              className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Phone
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <div
                class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {/* <span class="font-medium">Danger alert!</span>{" "} */}
                {formik.errors.phone}
              </div>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your password
            </label>
            {formik.errors.password && formik.touched.password ? (
              <div
                class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {/* <span class="font-medium">Danger alert!</span>{" "} */}
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="rePassword"
              className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your repassword
            </label>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div
                class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {/* <span class="font-medium">Danger alert!</span>{" "} */}
                {formik.errors.rePassword}
              </div>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className=" disabled:bg-gray-500  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <i class="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
