import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm({ values, errors, touched }) {
    return (
        <Form>
        <h1>New User</h1>
            <div>
                <p>
                <label htmlFor="name">Name: </label>
                {touched.name && errors.name && <span style={{color:"red"}}>{errors.name}</span>}
                <Field type="text" name="name" placeholder="First Name, Last Name"/>
                </p>
            </div>
            <div>
                <p>
                <label htmlFor="email">Email: </label>
                {touched.email && errors.email && <span style={{color:"red"}}>{errors.email}</span>}
                <Field type="email" name="email" placeholder="Email" />
                </p>
            </div>
            <div>
                <p>
                <label htmlFor="Password">Password: </label>
                {touched.password && errors.password && <span style={{color:"red"}}>{errors.password}</span>}
                <Field type="password" name="password" placeholder="Enter Password (must have minimum 8 characters)" />
                </p>
            </div>
            <div>
                <p>
                <label htmlFor="tos">
                <Field type="checkbox" name="tos" checked={values.tos} />
                Accept Terms Of Service 
                </label>
                </p>
            </div>
        <button type="submit">Submit!</button>
        </Form>
    );
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
    return {
        name: name || "",
        email: email || "",
        password: password || "",
        tos: tos || false,
    };
    },

    validationSchema: Yup.object().shape({
    name: Yup.string()
        .required("Name is required "),
    email: Yup.string()
        .email("Email not valid")
        .required("Email is required "),
    password: Yup.string()
        .min(8, "Password must be 8 characters or longer")
        .required("Password is required "),
    }),

    handleSubmit(values, {resetForm, setSubmitting}) {
    console.log(values);
    axios
    .post("https://reqres.in/api/users", values)
    .then(res => {
        console.log(res);
        resetForm();
        setSubmitting(false);
    })
    .catch(err => {
        console.log(err);
        setSubmitting(false);
    });
    }
    
})(UserForm);

export default FormikUserForm;

