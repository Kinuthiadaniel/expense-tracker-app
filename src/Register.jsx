import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import './Register.css';


const Register = () => {
  const [user, setUser] = useState([{}]);
  const [refreshPage, setRefreshPage] = useState(false);


  useEffect(() => {
    console.log("FETCH! ");
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, [refreshPage]);

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    name: yup.string().required("Must enter a name").max(15),
    password: yup
      .string()
      .required("Must enter password")
      .min(8, 'Password must be at least 8 characters'),

  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.status == 200) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Hello, sign up here</h1>
        <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
          <label htmlFor="email">Email Address</label>
          <br />
          <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <p style={{ color: "red" }}> {formik.errors.email}</p>
          <label htmlFor="name">Name</label>
          <br />

          <input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <p style={{ color: "red" }}> {formik.errors.name}</p>

          <label htmlFor="password">Password</label>
          <br />

          <input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <p style={{ color: "red" }}> {formik.errors.password}</p>
          <button type="submit" className="button">CREATE ACCOUNT</button>
          <div><p>Already has an account? <a href='/login'>Login</a></p> </div>
        </form>
        
      </div>
        
    </div>
  );
};

export default Register