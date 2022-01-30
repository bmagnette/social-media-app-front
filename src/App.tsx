import React, {useEffect} from 'react';
import './styles.scss';
import {Menu} from './shared/Menu/Menu';
import {Outlet} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

declare global {
    interface Window {
        foo: string;
        CRISP_WEBSITE_ID: string;
        $crisp: string[];
    }
}

const App: React.FC = () => {
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
        <div className="app">
            <div className="wrapper">
                <Menu />
                <Outlet />
            </div>
        </div>
    );
};

export default App;
