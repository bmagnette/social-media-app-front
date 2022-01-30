import {Link, useNavigate} from 'react-router-dom';
import React from 'react';
import './Menu.scss';
import {DownOutlined} from '@ant-design/icons';
import {useAuth} from '../../index';
import {Button} from '../Input/Button';

export const Menu = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    return (
        <div className={'menu-wrapper'}>
            <ul>
                <Link to="/accounts" className={'menu-logo'}>
                    <li>CronShot</li>
                </Link>
            </ul>
            <ul>
                {/*<Link to="/drafts">*/}
                {/*    <li>Post</li>*/}
                {/*</Link>*/}
                {/*<Link to="/users">*/}
                {/*    <li>User</li>*/}
                {/*</Link>*/}
                <Link to="/accounts">
                    <li>Account</li>
                </Link>
                <Link to="/calendar">
                    <li>Calendar</li>
                </Link>
                {/*<Link to="/analytics">*/}
                {/*    <li>Analytics</li>*/}
                {/*</Link>*/}
                <Link to="/posts">
                    <Button
                        className={'little-square-blue'}
                        title={'Create a post'}
                    />
                </Link>
            </ul>
            <div className="header_menu_wrapper">
                <ul id="menu-demo2">
                    <li>
                        Accel Gerancia <DownOutlined />
                        <ul>
                            {/*<Link to="/settings">*/}
                            {/*    <li>Settings</li>*/}
                            {/*</Link>*/}
                            <Link to="/billing">
                                <li>Billing</li>
                            </Link>
                            <li
                                onClick={() =>
                                    auth.signout(() => navigate('/'))
                                }>
                                Log Out
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};
