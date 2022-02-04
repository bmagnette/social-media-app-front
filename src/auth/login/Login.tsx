import React, {useState} from 'react';
import './Login.scss';
import {Link, useNavigate} from 'react-router-dom';
import validator from 'validator';
import {loginApplication} from '../../services/services';
import {toast} from 'react-toastify';
import {useAuth} from '../../index';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const validateForm = (e) => {
        e.preventDefault();
        if (!validator.isEmail(email)) {
            setEmailError('Enter valid Email!');
            return;
        }

        if (password.length <= 3) {
            setPasswordError('Password must be longer');
            return;
        }
        const payload = {
            username: email,
            password: password,
        };

        loginApplication(payload)
            .then((response) => {
                auth.signin(email, () => {
                    navigate('/accounts');
                    localStorage.setItem('TOKEN', response.data.user.token);
                });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            });
    };

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
                            onKeyDown={(e) => validateForm(e)}
                            onSubmit={(e) => validateForm(e)}>
                            <div className="form-group">
                                <label
                                    htmlFor="username"
                                    className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
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
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
                                <Link to={'/register'}>
                                    <button className="off">Sign Up</button>
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
