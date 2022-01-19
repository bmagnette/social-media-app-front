import React from 'react';
import './styles.scss';
import {Menu} from './shared/Menu/Menu';
import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    return (
        <div className="app">
            <div className="wrapper">
                <Menu />
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    );
};

export default App;
