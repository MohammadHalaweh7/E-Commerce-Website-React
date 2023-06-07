import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";

export default function Register() {
  let [errors, setErrors] = useState([]);
  let [statusError, setStatusError] = useState("");
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cPassword: "",
    },
    onSubmit: sendRegisterData,
  });
  async function sendRegisterData(values) {
    let { data } = await axios
      .post(
        "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup",
        values
      )
      .catch((err) => {
        setStatusError(err.response.data.message);
      });
    console.log(data);
    if (data.message === "success") {
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
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="form-control my-3"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <label htmlFor="name">Email</label>
        <input
          type="email"
          name="email"
          className="form-control my-3"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <label htmlFor="name">Password</label>
        <input
          type="password"
          name="password"
          className="form-control my-3"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <label htmlFor="name">Confirm Password</label>
        <input
          type="password"
          name="cPassword"
          className="form-control my-3"
          value={formik.values.cPassword}
          onChange={formik.handleChange}
        />

        <button type="submit" className="btn btn-info mt-3">
          Register
        </button>
      </form>
    </div>
  );
}
