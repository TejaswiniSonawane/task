import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./loginFormStyle.css";
import axios from "axios";
// import { useHistory } from "react-router-dom";


const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is a required field")
        .min(8, "Password must be at least 8 characters"),
});

class LoginForm extends React.Component {



    handleSubmit = (values) => {
        // let history = useHistory();
        values.email = "eve.holt@reqres.in";
        values.password = "cityslicka";
        // Please enter input values- email = "eve.holt@reqres.in" / password = "cityslicka";

        axios.post("https://reqres.in/api/login",{...values})
            .then((res)=>{
                 localStorage.setItem('userToken', res.data.token);
                 alert.show('User login successfully!')
                 // navigate to homepage
            })
            .catch((e)=>{
                return e;
            })
    };

    render() {
        return (

            <>
                <Formik
                    validationSchema={loginSchema}
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(values) => {
                        this.handleSubmit(values);
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                      }) => (
                        <div className="login">
                            <div className="form">
                                <form noValidate onSubmit={handleSubmit}>
                                    <span>Login</span>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Enter email id / username"
                                        className="form-control inp_text"
                                        id="email"
                                    />
                                    <p className="error">
                                        {errors.email && touched.email && errors.email}
                                    </p>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder="Enter password"
                                        className="form-control"
                                    />
                                    <p className="error">
                                        {errors.password && touched.password && errors.password}
                                    </p>
                                    <button type="submit">Login</button>
                                </form>
                            </div>
                        </div>
                    )}
                </Formik>
            </>
        );
    }
}

export default LoginForm;
