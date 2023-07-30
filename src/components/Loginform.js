import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './formStyle.css'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const Loginform = (props) => {
    const [error, setError] = useState(null)
    // const [user_id, setUserId] = useState('')
    const [username, setUsername] = useState('')
    let navigate = useNavigate();
    const onSubmit = async (values) => {
        const response = await axios.post('http://localhost:8080/users/login', values).catch((err) => {
            if (err && err.response) {
                console.log("Error: ", err.response.data.message)///////////////////
                setError(err.response.data.message)
            }
        })
        // if (response && response.data) {
        //     setUserId(response.data.userId)

        //     // console.log(typeof(response.data.userId))
        //     setError(null)
        //     navigate('/profile', { state: { id: response.data.userId } }); //redirect to the profile page
        //     formik.resetForm()
        // }

        if (response && response.data) {
            // console.log(response.data.userRole)
            if (response.data.userRole === "admin" || response.data.userRole === "super admin") {
                // console.log("frst", response.data.username)
                // setUsername(response.data.username)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('role', response.data.userRole)
                sessionStorage.setItem('token', response.data.token)
                localStorage.setItem('id', response.data.userId)
                // localStorage.setItem('id', response.data.userId)
                // navigate('/dashboard', {
                //     state: {
                //         id: response.data.userId,
                //         username: response.data.username,
                //         role: response.data.userRole,
                //     }
                // });

                navigate('/dashboard');

            }
            else {
                // console.log(response.data)
                // setUserId(response.data.userId)
             
                sessionStorage.setItem('token', response.data.token)
                localStorage.setItem('id', response.data.userId)
                navigate('/profile'); //redirect to the profile page
            }
            // console.log(typeof (response.data.userId))
            setError(null)

            formik.resetForm()
        }
    }




    // const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const validationSchema = yup.object({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
    })

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema
    })

    // const sendDataToParent = () => {
    // console.log("nothing", user_id)
    // props.myFunc(user_id)
    // props.myUsername(username)
    // console.log("username in login", username)
    // }


    // useEffect(() => {
    //     console.log("nothing", user_id);
    //     props.myFunc(user_id);
    // }, [user_id, props]);


    const handleInputChange = (event) => {
        setError(null)
    };
    return (
        <div className="form-body">
            <div className="row">
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items">
                            <h3>Welcome Back!</h3>
                            <span className={error ? 'error' : ''}>{error ? error : ''}</span>
                            <form
                                className="requires-validation"
                                onSubmit={formik.handleSubmit} // to prevent submit
                                noValidate
                            >
                                <div className="col-md-12">
                                    <input onBlur={formik.handleBlur} onChange={(event) => {
                                        formik.handleChange(event);
                                        handleInputChange(event);
                                    }} value={formik.values.email} className="form-control" type="email" name="email" placeholder="E-mail Address" required />
                                    <span className={formik.touched.email && formik.errors.email ? "invalid-feedback" : "valid-feedback"}>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</span>
                                </div>
                                <div className="col-md-12">
                                    <input onBlur={formik.handleBlur} onChange={(event) => {
                                        formik.handleChange(event);
                                        handleInputChange(event);
                                    }} value={formik.values.password} className="form-control" type="password" name="password" placeholder="Password" required />
                                    <span className={formik.touched.password && formik.errors.password ? "invalid-feedback" : "valid-feedback"}>{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</span>
                                </div>
                                <div className="form-button mt-3 d-flex justify-content-between">
                                    <button
                                        id="submit" type="submit" className="btn">Get In</button>
                                    <p>New here? Let's get you <Link className='login_link' to={'/'}>registered!</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginform
