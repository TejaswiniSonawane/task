import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./loginFormStyle.css";
import axios from "axios";
// import { useHistory } from "react-router-dom";

const signUpSchema = Yup.object({
    firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
        .required('Required')
        .min(6, 'Password must be 6 characters long'),
        // .matches(/[0-9]/, 'Password requires a number')
        // .matches(/[a-z]/, 'Password requires a lowercase letter')
        // .matches(/[A-Z]/, 'Password requires an uppercase letter')
        // .matches(/[^\w]/, 'Password requires a symbol'),
    confirm: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
        )
    })
});

class SignupForm extends React.Component {

    handleSubmit = (values) => {
        // let history = useHistory();
        // Please give input value- "email": "eve.holt@reqres.in", "password": "pistol"
        let formValues= {
            "email": values.email,
            "password": values.confirm,
        }
        let userValues= {
            "name": values.firstName + " " +values.lastName,
            "job": "emp_betacraft",
        }
        axios.post("https://reqres.in/api/users",{...userValues})
            .then((res)=>{
                // we can save res as user data
            })
            .catch((e)=>{
                return e;
            })
        axios.post("https://reqres.in/api/register",{...formValues})
            .then((res)=>{
                 localStorage.setItem('userToken', res.data.token);
                 alert.show('User register successfully!')
                // navigate to login form
            })
            .catch((e)=>{
                return e;
            })
    };

    render() {
        return (

            <>
                <Formik
                    validationSchema={signUpSchema}
                    initialValues={{ firstName: '',
                        lastName: '',
                        email: '',
                        password:'',
                    confirm: ''}}
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
                                    <span>Sign Up</span>
                                    <div style={{display: "flex",
                                        justifyContent: "flex-start",
                                        flexDirection: "column",
                                        alignItems:"start",
                                        }}>
                                        <label htmlFor="firstName" style={{marginBottom:10}}>First Name</label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.firstName}
                                        />
                                        <p className="error">
                                            {errors.firstName && touched.firstName && errors.firstName}
                                        </p>
                                        <label htmlFor="lastName" style={{marginBottom:10}}>Last Name</label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                        />
                                        <p className="error">
                                            {errors.lastName && touched.lastName && errors.lastName}
                                        </p>
                                        <label htmlFor="email" style={{marginBottom:10}}>Email Address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        <p className="error">
                                            {errors.email && touched.email && errors.email}
                                        </p>
                                        <label htmlFor="password" style={{marginBottom:10}}>Password</label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />
                                        <p className="error">
                                            {errors.password && touched.password && errors.password}
                                        </p>
                                        <label htmlFor="confirm" style={{marginBottom:10}}>Confirm Password</label>
                                        <input
                                            id="confirm"
                                            name="confirm"
                                            type="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirm}
                                        />
                                        <p className="error">
                                            {errors.confirm && touched.confirm && errors.confirm}
                                        </p>
                                    </div>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    )}
                </Formik>
            </>
        );
    }
}

export default SignupForm;
