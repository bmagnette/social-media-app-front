import React, {useState} from 'react';
import './Register.scss';
import {Link, useNavigate} from 'react-router-dom';
import validator from 'validator';
import {registerUser} from '../../services/services';
import {toast} from 'react-toastify';

export const RegisterForm = () => {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    return (
        <div className={'register-wrapper'}>
            <div id="back">
                <div className="backLeft" />
            </div>

            <div id="slideBox">
                <div className="topLayer">
                    <div className="content">
                        <h2>Register</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!validator.isEmail(e.target[0].value)) {
                                    setEmailError('Enter valid Email!');
                                    return;
                                }

                                if (e.target[1].value.length <= 3) {
                                    setPasswordError('Password must be longer');
                                    return;
                                }
                                const payload = {
                                    email: e.target[0].value,
                                    password: e.target[1].value,
                                };
                                registerUser(payload)
                                    .then(function (response) {
                                        toast.info(response.data.message, {
                                            position: 'top-right',
                                            autoClose: 5000,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                        });
                                        navigate('/');
                                    })
                                    .catch(function (error) {
                                        toast.error(
                                            error.response.data.message,
                                            {
                                                position: 'top-right',
                                                autoClose: 5000,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                            },
                                        );
                                    });
                            }}>
                            <div className="form-group">
                                <label
                                    htmlFor="username"
                                    className="form-label">
                                    Email
                                </label>
                                <input required name="email" type="email" />
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>
                                    {emailError}
                                </span>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="password"
                                    className="form-label">
                                    Password
                                </label>
                                <input
                                    required
                                    name="password"
                                    type="password"
                                />
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>
                                    {passwordError}
                                </span>
                            </div>
                            <div className={'wrapper-button'}>
                                <Link to={'/'}>
                                    <button id="login" className="off">
                                        Return
                                    </button>
                                </Link>
                                <button id="goRight" type="submit">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
