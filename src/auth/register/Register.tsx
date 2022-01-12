import React from 'react';
import './Register.scss';
import {Link} from 'react-router-dom';

export const RegisterForm = () => {
    return (
        <div className={'register-wrapper'}>
            <div id="back">
                <div className="backLeft" />
            </div>

            <div id="slideBox">
                <div className="topLayer">
                    <div className="right">
                        <div className="content">
                            <h2>Register</h2>
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
                                        htmlFor="username"
                                        className="form-label">
                                        Password
                                    </label>
                                    <input type="text" />
                                </div>
                                <Link to={'/login'}>
                                    <button id="login" className="off">
                                        Return
                                    </button>
                                </Link>
                                <Link to={'/'}>
                                    <button id="goRight" type="submit">
                                        Sign Up
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
