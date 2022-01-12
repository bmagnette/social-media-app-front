import React from 'react';
import './Login.scss';
import {Link} from 'react-router-dom';

export const Login = () => {
    return (
        <div className={'login-wrapper'}>
            <div id="back">
                <div className="backLeft" />
            </div>

            <div id="slideBox">
                <div className="topLayer">
                    <div className="right">
                        <div className="content">
                            <h2>Login</h2>
                            <form>
                                <div className="form-group">
                                    <label
                                        htmlFor="username"
                                        className="form-label">
                                        Email
                                    </label>
                                    <input type="text" />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="password"
                                        className="form-label">
                                        Password
                                    </label>
                                    <input type="text" />
                                </div>
                                <Link to={'/register'}>
                                    <button id="goRight" className="off">
                                        Sign Up
                                    </button>
                                </Link>
                                <Link to={'/'}>
                                    <button id="login" type="submit">
                                        Login
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
