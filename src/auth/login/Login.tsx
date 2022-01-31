import React, {useEffect, useState} from 'react';
import './Login.scss';
import {Link, useNavigate} from 'react-router-dom';
import validator from 'validator';
import {loginApplication} from '../../services/services';
import {toast} from 'react-toastify';
import {useAuth} from '../../index';

export const Login = () => {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();
    useEffect(() => {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = 'd5566262-32c9-41d4-bbac-392942b259f6';

        (function () {
            const d = document;
            const s = d.createElement('script');
            s.src = 'https://client.crisp.chat/l.js';
            s.async = Boolean(1);
            s.id = 'chatID';
            d.getElementsByTagName('head')[0].appendChild(s);
        })();
    }, []);
    return (
        <div className={'login-wrapper'}>
            <div id="back">
                <div className="backLeft" />
            </div>

            <div id="slideBox">
                <div className="topLayer">
                    <div className="content">
                        <h2>Login</h2>
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
                                    username: e.target[0].value,
                                    password: e.target[1].value,
                                };

                                loginApplication(payload)
                                    .then((response) => {
                                        auth.signin(e.target[0].value, () => {
                                            navigate('/accounts');
                                            localStorage.setItem(
                                                'TOKEN',
                                                response.data.user.token,
                                            );
                                        });
                                    })
                                    .catch((error) => {
                                        console.log(error);
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
                                <input type="text" />
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>
                                    {emailError}
                                </span>{' '}
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="password"
                                    className="form-label">
                                    Password
                                </label>
                                <input type="password" />
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}>
                                    {passwordError}
                                </span>
                            </div>
                            <div className={'wrapper-button'}>
                                <Link to={'/register'}>
                                    <button id="goRight" className="off">
                                        Sign Up
                                    </button>
                                </Link>
                                <button id="login" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
