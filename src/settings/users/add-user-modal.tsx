import {Button, Checkbox, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import './add-user-modal.scss';
import {InputField} from '../../shared/Input/input';
import {useNavigate} from 'react-router';
import {
    createAccount, editUser,
    errorsHandlers,
    GetCategories, GetCategoriesByUser, getUsers,
} from '../../services/services';
import {DropdownField} from '../../shared/Input/Dropdown';

export const AddUserModal = (props) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [groups, setGroups] = useState([]);
    const [isChecked, setIsChecked] = useState({});

    const [dropdownOptions, setDropdownOptions] = useState([
        'ADMIN',
        'USER',
        'READER',
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        GetCategories(navigate).then((r) => setGroups(r));

        if (props.data) {
            GetCategoriesByUser(props.data.key, navigate).then((r) => {
                setEmail(props.data.email);
                setName(props.data.name);

                groups.map(group =>{
                    let res = r.find(test => {
                        if(test.id === group.id){
                            return {'access_type': test.right.access_type, 'checked': true}
                        } else{
                            return null
                        }
                    });

                    isChecked[group.id] = {authorization: res ? res.right.access_type : 'ADMIN', checked: !!res};
                    setIsChecked(isChecked)
                });
            });

        }
    }, [props.data]);

    const onDropdownChange = (e, _id) => {
        if (_id in isChecked) {
            isChecked[_id]['authorization'] = e.value;
        } else {
            isChecked[_id] = {authorization: e.value};
        }
        setIsChecked(isChecked);
    };

    const handleSubmit = () => {
        const payload = {
            oldEmail: props.data?.email,
            email,
            name,
            groups: isChecked,
        };

        const nbSelectedGroups = Object.keys(isChecked).map((groupID) => {
            return isChecked[groupID] === true;
        }).length;

        if (!name) {
            toast.error('Need to fulfill account name', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }
        if (!email) {
            toast.error('Need to fulfill email', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }

        if (props.data?.email !== undefined && email !== props.data?.email) {
            toast.error("You can't modify an email. Create a new account.", {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }
        if (nbSelectedGroups === 0) {
            toast.error('Need to select a group', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }

        const fct = props.data ? editUser(payload): createAccount(payload)
        errorsHandlers(fct, navigate).then((r) => {
            toast.info(r['data']['message'], {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            handleCancel();
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
                props.setUsers(res);
            });
        });
    };

    const handleCancel = () => {
        setEmail('');
        setName('');
        setIsChecked({});
        props.handleCancel();
    };

    const onChange = (e, _id) => {
        let temp = {...isChecked};
        if (_id in isChecked) {
            temp[_id]['checked'] = e.target.checked;
        } else {
            temp[_id] = {checked: e.target.checked, authorization: 'ADMIN'};
        }
        setIsChecked(temp);
    };

    return (
        <Modal
            visible={props.isVisible}
            onCancel={handleCancel}
            footer={
                <>
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>
                    <Button type="primary" onClick={handleSubmit}>
                        {props.data ? 'Edit User' : 'Save new user'}
                    </Button>
                    {props.data && (
                        <Button
                            danger
                            onClick={() => {
                                handleCancel();
                                props.onDelete(props.data?.email)
                            }}>
                            Delete user
                        </Button>
                    )}
                </>
            }>
            <div className={'add-user-modal-wrapper'}>
                <h3>Fulfill new user information :</h3>
                <div className={'form-group'}>
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <InputField
                        placeholder={'Vincent'}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">
                        Email
                    </label>
                    <InputField
                        placeholder={'contact@cronshot.com'}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>

                <div>
                    <h3>Give access to groups :</h3>
                    <div className={'group-row-wrapper'}>
                        <div className={'group-row'}>
                            <div>Group Name</div>
                            <div>Authorization</div>
                            <div>Selection</div>
                        </div>
                        {groups.map((group) => {
                            return (
                                <div key={group.id} className={'group-row'}>
                                    <div className={'group-row-label'}>
                                        {group.label}
                                    </div>
                                    <DropdownField
                                        options={dropdownOptions}
                                        onChange={(e) =>
                                            onDropdownChange(e, group.id)
                                        }
                                        value={isChecked[group.id]?.authorization || 'ADMIN'}
                                        controlClassName={'little-dropdown'}
                                    />
                                    <Checkbox
                                        checked={isChecked[group.id]?.checked}
                                        onChange={(e) => onChange(e, group.id)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Modal>
    );
};
