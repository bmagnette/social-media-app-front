import React from 'react';
import './styles.scss';
import {Menu} from './shared/Menu/Menu';
import {Outlet} from 'react-router-dom';

const App: React.FC = () => {
    return (
        <div className="app">
            <div className="wrapper">
                <Menu />
                <Outlet />
            </div>
        </div>
    );
};

export default App;
