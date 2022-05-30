import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Menu} from './shared/Menu/Menu';
import {Outlet, useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {errorsHandlersGET, getUserInfos} from './services/services';

declare global {
    interface Window {
        foo: string;
        CRISP_WEBSITE_ID: string;
        $crisp: string[];
    }
}

const App: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    async function loadData() {
        const res = await errorsHandlersGET(getUserInfos(), navigate);
        setUser(res);
    }
    useEffect(() => {
        loadData();

        window.$crisp = [];
        window.CRISP_WEBSITE_ID = 'e38ca6ad-fa2b-434f-bb07-cb43120dc08c';

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
                <Menu user={user}/>
                <Outlet context={user} />
            </div>
        </div>
    );
};

export default App;
