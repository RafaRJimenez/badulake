import React from 'react'
import PropTypes from 'prop-types'

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Field, ErrorMessage } from 'formik';


const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
        password: Yup.string().required("password is required")
    }
)


const LoginForm = ({loged, fetching, onLogin}) => {

    const initialCredentials = {
        email: "",
        password: ""
    }

    return (
        <div>
        <h4>Login Formik</h4>
        <Formik
        // initial values that the form will take 
           initialValues = { initialCredentials }
        //    yup validation schema
           validationSchema = {loginSchema}
        //    onSubmit Event
                onSubmit={async (values) => {
               onLogin(values.email, values.password)
            }}
        >

            {/* We obtain props from formik */}

            {
                ({
                    values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur, }) => (
                            <Form>
                            <label htmlFor="email">Email</label>
                            <Field id="email" name="email" placeholder="example@email.com" />
                            {/* email errors */}
                            {
                                errors.email && touched.email && (
                                    <>
                                    {/* <div className='error'>
                                        <p>{errors.email}</p>
                                    </div> */}
                                    <ErrorMessage name='email' component="div"></ErrorMessage>
                                    </>
                                )
                            }
                            <label htmlFor="password">Password</label>
                            <Field
                            id="password"
                            name="password"
                            placeholder="password"
                            type="password"
                            />
                              {/* password errors */}
                              {
                                errors.password && touched.password && (
                                    <>
                                    {/* <div className='error'>
                                        <p>{errors.password}</p>
                                    </div> */}
                                    <ErrorMessage name='password' component="div"></ErrorMessage>
                                    </>
                                )
                            }
                            <button type="submit">Login</button>
                            { fetching ? (<p>LOADING...</p>) : null }
                            {isSubmitting ? (<p>Login your credentials...</p>): null
                            }
                        </Form>
                        ) }
        </Formik>
        </div>
    );
}
 

   

LoginForm.propTypes = {
    loged: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired
}

export default LoginForm

