import {Link} from 'react-router-dom';
import React from 'react';
import './Menu.scss';
import {DownOutlined} from '@ant-design/icons';

export const Menu = () => {
    return (
        <div className={'menu-wrapper'}>
            <ul>
                <Link to="/accounts" className={'menu-logo'}>
                    <li>Social Cron</li>
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
                    <li className={'button-menu'}>
                        <button>Create a post</button>
                    </li>
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
                            {/*<Link to="/invoices">*/}
                            {/*    <li>Billing</li>*/}
                            {/*</Link>*/}
                            <Link to="/login">
                                <li>Log Out</li>
                            </Link>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};
