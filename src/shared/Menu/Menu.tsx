import {Link, useNavigate} from 'react-router-dom';
import React from 'react';
import './Menu.scss';
import {DownOutlined} from '@ant-design/icons';
import {useAuth} from '../../index';
import {Button} from '../Input/Button';

export const Menu = (props) => {
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
                <Link to="/accounts">
                    <li>Accounts</li>
                </Link>
                <Link to="/calendar">
                    <li>Calendar</li>
                </Link>
                {/*<Link to="/analytics">*/}
                {/*    <li>Analytics</li>*/}
                {/*</Link>*/}
                {props.user?.user.user_type !== "READER" &&                 <Link to="/posts">
                    <Button
                        className={'little-square-blue'}
                        title={'Create a post'}
                    />
                </Link>}

            </ul>
            <div className="header_menu_wrapper">
                <ul id="menu-demo2">
                    <li>
                        <Link to="/settings">
                            {props.user?.user.email} <DownOutlined />
                        </Link>
                        <ul>
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
