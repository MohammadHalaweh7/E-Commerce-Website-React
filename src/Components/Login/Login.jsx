import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export default function Login() {
  let [errors, setErrors] = useState([]);
  let [statusError, setStatusError] = useState("");
  const navigate = useNavigate();

  const schema = Yup.object({
    email:Yup.string().required("email is required").email("not valid email"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,7}$/),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },validationSchema:schema,
    onSubmit: sendRegisterData,
  });

   
  async function sendRegisterData(values) {
    let { data } = await axios
      .post(
        "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",
        values
      )
      .catch((err) => {
        setStatusError(err.response.data.message);
      });
    console.log(data);
    if (data.message === "Done") {
      setErrors([])
      setStatusError('')
      localStorage.getItem("userToken",data.access_token)
      navigate('/home');
      console.log("welcome");
      
    } else {
      setErrors(data.err[0]);
    }
  }
  return (
    <div className="w-75 m-auto">
      <h2 className="">Login Now</h2>
      {<div className="text-danger">{statusError}</div>}
      {errors.map((error) => {
        return <div className="text-danger bg-light">{error.message}</div>;
      })}
      <form action="" onSubmit={formik.handleSubmit}>
    
        <label htmlFor="name">Email</label>
        <input
          type="email"
          name="email"
          className="form-control my-3"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email?<p className="alert alert-danger">{formik.errors.email}</p>:''}

        <label htmlFor="name">Password</label>
        <input
          type="password"
          name="password"
          className="form-control my-3"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password?<p className="alert alert-danger">{formik.errors.password}</p>:''}

        <button type="submit" className="btn btn-info mt-3">
          Login
        </button>
      </form>
    </div>
  );
}
