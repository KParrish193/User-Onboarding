import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

function UserForm({ values, errors, touched }) {
    return (
        <Form>
        <div>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="text" name="name" placeholder="First Name, Last Name"/>
        </div>
        <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
        </div>
        <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Enter Password (must have minimum 8 characters)" />
        </div>
        <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept Terms Of Service 
        </label>
        <button>Submit!</button>
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
        .required("Name is required"),
    email: Yup.string()
        .email("Email not valid")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be 8 characters or longer")
        .required("Password is required")
    }),

    handleSubmit(values) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.



    }
})(UserForm);

export default FormikUserForm;

