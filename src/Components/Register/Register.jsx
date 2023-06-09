import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export default function Register() {
  let [errors, setErrors] = useState([]);
  let [statusError, setStatusError] = useState("");
  const navigate = useNavigate();

  const schema = Yup.object({
    userName:Yup.string().required("name is required").min(3,"min is 3 char").max(10,"max is 10 char"),
    email:Yup.string().required("email is required").email("not valid email"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,7}$/),
    cPassword:Yup.string().required("Confirm password is required").oneOf([Yup.ref('password')],'not match password')
  })
  let formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      cPassword: "",
    },validationSchema:schema,
    onSubmit: sendRegisterData,
  });

   
  async function sendRegisterData(values) {
    let { data } = await axios
      .post(
        "https://precious-bass-tights.cyclic.app/auth/signup'",
        values
      )
      .catch((err) => {
        setStatusError(err.response.data.message);
      });
    console.log(data);
    if (data.message === "success") {
      setErrors([])
      setStatusError('')
      navigate('/login');
      console.log("welcome");
      
    } else {
      setErrors(data.err[0]);
    }
  }
  return (
    <div className="w-75 m-auto">
      <h2 className="">Register Now</h2>
      {<div className="text-danger">{statusError}</div>}
      {errors.map((error) => {
        return <div className="text-danger bg-light">{error.message}</div>;
      })}
      <form action="" onSubmit={formik.handleSubmit}>
        <label htmlFor="userName">Name</label>
        <input
          type="text"
          name="userName"
          className="form-control my-3"
          value={formik.values.userName}
          onChange={formik.handleChange}
        />

        {formik.errors.userName?<p className="alert alert-danger">{formik.errors.userName}</p>:''}

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

        

        <label htmlFor="name">Confirm Password</label>
        <input
          type="password"
          name="cPassword"
          className="form-control my-3"
          value={formik.values.cPassword}
          onChange={formik.handleChange}
        />
        {formik.errors.cPassword?<p className="alert alert-danger">{formik.errors.cPassword}</p>:''}

        <button type="submit" className="btn btn-info mt-3">
          Register
        </button>
      </form>
    </div>
  );
}
