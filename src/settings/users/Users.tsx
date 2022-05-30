import React, {useEffect, useState} from 'react';
import {Button} from '../../shared/Input/Button';
import {AddUserModal} from './add-user-modal';
import {Table} from 'antd';
import {deleteUser, editUser, getUsers} from '../../services/services';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Groups',
        dataIndex: 'groups',
        key: 'groups',
    },
];
export const Users = () => {
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isModifyingUser, setIsModifyingUser] = useState(false);

    const [users, setUsers] = useState([]);
    const [onClickData, setOnClickData] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getUsers().then((r) => {
            setIsLoading(true);
            let res = [];
            r.data.data.map((user) => {
                res.push({
                    key: user.id,
                    email: user.email,
                    name: user.last_name,
                    groups: user.groups.map((group) => {
                        return <div>{group.label}</div>;
                    }),
                    groupsData: user.groups
                });
            });
            setUsers(res);
            setIsLoading(false);
        });
    }, []);

    const onDelete = (_id) => {
        deleteUser(_id).then((r) => {
            setIsLoading(true);

            getUsers().then((r) => {
                let res = [];
                r.data.data.map((user) => {
                    res.push({
                        key: user.id,
                        email: user.email,
                        name: user.last_name,
                        groups: user.groups.map((group) => {
                            return <div>{group.label}</div>;
                        }),
                        groupsData: user.groups
                    });
                });
                setIsAddingUser(false);
                setUsers(res);
                setIsLoading(false);
            });
        });
    };

    return (
        <>
            <Button
                className={'big-square-blue'}
                submit={() => {
                    setIsAddingUser(true);
                }}
                title={'Add a User'}
            />
            <Table
                dataSource={users}
                columns={columns}
                loading={isLoading}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setIsModifyingUser(true);
                            setOnClickData(record);
                        },
                    };
                }}
            />
            ;
            <AddUserModal
                data={onClickData}
                isVisible={isAddingUser || isModifyingUser}
                handleCancel={() => {
                    setIsAddingUser(false);
                    setIsModifyingUser(false);
                    setOnClickData(null);
                }}
                onDelete={onDelete}
                setUsers={setUsers}
            />
        </>
    );
};
