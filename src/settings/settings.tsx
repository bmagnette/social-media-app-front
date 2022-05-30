import React from 'react';
import {Tabs} from 'antd';
import {Billing} from './billing/billing';
import {Users} from './users/Users';

const {TabPane} = Tabs;

export const Settings = () => {
    function callback(key) {
        // console.log(key);
    }

    return (
        <>
            {localStorage.getItem('USER_TYPE') === 'ADMIN' ? (
                <Tabs defaultActiveKey="1" onChange={callback} size={'small'}>
                    <TabPane tab="Billing" key="1">
                        <Billing />
                    </TabPane>
                    <TabPane tab="Users" key="2">
                        <Users />
                    </TabPane>
                </Tabs>
            ) : (
                'Settings are available on ADMIN account'
            )}
        </>
    );
};
