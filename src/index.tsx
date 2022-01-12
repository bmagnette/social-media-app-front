import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Posts} from './posts/posts';
import {Accounts} from './accounts/accounts';
import {Calendar} from './calendar/calendar';
import 'antd/dist/antd.css';
import {Drafts} from './draft/draft';
import {Users} from './users/Users';
import {Analytics} from './analytics/analytics';
import {Settings} from './settings/settings';
import {Login} from './auth/login/Login';
import {RegisterForm} from './auth/register/Register';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm />} />

                <Route path="/" element={<App />}>
                    <Route path="/drafts" element={<Drafts />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route
                        path="*"
                        element={
                            <main style={{padding: '1rem'}}>
                                <p>Theres nothing here!</p>
                            </main>
                        }
                    />
                </Route>
                <Route
                    path="*"
                    element={
                        <main style={{padding: '1rem'}}>
                            <p>Theres nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
