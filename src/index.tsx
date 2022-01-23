import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
    Outlet,
    Navigate,
} from 'react-router-dom';
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
import {ToastContainer} from 'react-toastify';

interface AuthContextType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState(null);

    const signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        });
    };

    const signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    const value = {user, signin, signout};

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },
    signout(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
};

export function useAuth() {
    return React.useContext(AuthContext);
}

function RequireAuth() {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{from: location}} />;
    }

    return <Outlet />;
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterForm />} />

                    <Route element={<App />}>
                        <Route element={<RequireAuth />}>
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
            </AuthProvider>
        </BrowserRouter>
        <ToastContainer />
    </React.StrictMode>,
    document.getElementById('root'),
);
