import React, {useEffect, useState} from 'react';
import {GetAccountsByCategory, GetAccountsWithoutCategory, GetCategories, PostMessage} from '../services/services';
import {clickOnList} from '../shared/helpers/function';
import {DropdownField} from '../shared/Input/Dropdown';
import {AccountCard} from '../shared/Account/AccountCard';
import './Posts.scss';
import {Button} from '../shared/Input/Button';
import {TabsInput} from '../shared/Tabs/Tabs/Tabs';
import {ImageUploader} from './image-uploader/image-uploader';
import {v4 as uuidv4} from 'uuid';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {ScheduleModal} from './schedule-modal/schedule-modal';
import {DownOutlined, SettingOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Button as Btn, Dropdown, Menu} from 'antd';
import {BulkModal} from './bulk-modal/bulk-modal';

export const Posts = () => {
    const [accounts, setAccounts] = useState([]);
    const [message, setMessage] = useState('');
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [categories, setCategories] = useState([]);

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [dropdownValue, setDropdownValue] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState(null);

    const [isSchedulerVisible, setisSchedulerVisible] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(null);

    const [isBulkUpload, setBulkUpload] = useState(false);
    const navigate = useNavigate();

    async function loadCategories() {
        const categories = await GetCategories(navigate);
        setCategories(categories);

        const catego = categories.map((category: {label: string}) => {
            return category.label;
        });
        catego.push('Without a group');
        const reverseList = catego.reverse();
        setDropdownValue(reverseList[0]);
        setDropdownOptions(reverseList);
    }

    async function loadAccounts() {
        const accounts = await GetAccountsWithoutCategory(navigate);
        setAccounts(accounts);
    }

    useEffect(() => {
        loadAccounts();
        loadCategories();
    }, []);

    const submit = (schedulerPayload = {}) => {
        setIsLoading(true);
        const activeAccounts = accounts.filter(function(account) {
            return account.isActive === true;
        });

        const payload = {
            accounts: activeAccounts,
            message: message,
            ...schedulerPayload,
        };

        if (activeAccounts.length > 0 && message.length > 2) {
            PostMessage(navigate, payload)
                .then(function(response) {
                    toast.info(response.data.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    setMessage('');
                    setIsLoading(false);
                    unselectAllAccounts(accounts);
                })
                .catch(function(error) {
                    // if (error.response.status === 401) {
                    //     navigate('/');
                    // }

                    toast.error(error.response.data.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    setIsLoading(false);
                });
        } else {
            const message =
                activeAccounts.length === 0
                    ? 'No account selected'
                    : 'Write a message';
            toast.error(message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            setIsLoading(false);
        }
    };

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const onDropdownChange = async (value) => {
        if (value.label === 'Without a group') {
            setAccounts(await GetAccountsWithoutCategory(navigate));
        } else {
            const category = categories.find(
                (category) => category.label === value.label,
            );
            setCategory(category.id);
            setDropdownValue(value.value);
            setAccounts(await GetAccountsByCategory(navigate, category.id));
        }
        setMessage('');
    };

    const unselectAllAccounts = (accounts) => {
        const newAccounts = accounts.map((account) => {
            if (account.hasOwnProperty('isActive')) {
                account['isActive'] = false;
            }
            return account;
        });
        setAccounts(newAccounts);
    };

    function findSurrogatePair(point) {
        const offset = point - 0x10000,
            lead = 0xd800 + (offset >> 10),
            trail = 0xdc00 + (offset & 0x3ff);
        return String.fromCharCode(lead) + String.fromCharCode(trail);
    }

    const onEmojiClick = (emoji, event) => {
        setChosenEmoji(emoji);
        const res = findSurrogatePair('0x' + emoji.unified);
        setMessage(message + res);
    };

    const validateScheduler = (e) => {
        setisSchedulerVisible(false);
        setScheduleDate(null);
        submit({
            isScheduling: true,
            scheduleTime: scheduleDate,
        });
    };

    const showModal = () => {
        const activeAccounts = accounts.filter(function(account) {
            return account.isActive === true;
        });

        if (activeAccounts.length > 0 && message.length > 2) {
            setisSchedulerVisible(true);
        } else {
            const message =
                activeAccounts.length === 0
                    ? 'No account selected'
                    : 'Write a message';
            toast.error(message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    const menu = (
        <Menu>
            <Menu.Item key={uuidv4()}>
                <div onClick={() => setBulkUpload(true)}>Import Post from CSV</div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={'posts-wrapper'}>
            <div className={'selection-wrapper'}>
                <DropdownField
                    placeholder={'Select a group'}
                    options={dropdownOptions}
                    onChange={onDropdownChange}
                    controlClassName={"medium-dropdown"}
                    value={dropdownValue}
                />
                <Dropdown overlay={menu}>
                    <Btn>
                        <SettingOutlined/> <DownOutlined/>
                    </Btn>
                </Dropdown>
            </div>
            <ul>
                <AccountCard
                    key={uuidv4()}
                    accounts={accounts}
                    clickOnList={clickOnList}
                    setAccounts={setAccounts}
                />
            </ul>
            <div>
                {accounts.length > 0 && (
                    <form className={'post-form'}>
                        <div className="text-area-wrapper">
                            <TabsInput
                                message={message}
                                handleChange={handleChange}
                                onEmojiClick={onEmojiClick}
                            />
                        </div>
                        <ImageUploader/>
                        <div className={'button-wrapper'}>
                            <Button
                                className={'large-square-blue'}
                                title={'Post now'}
                                disabled={isLoading}
                                isLoading={isLoading}
                                submit={() => submit({})}
                            />
                            <Button
                                className={'large-square-blue'}
                                title={'Schedule'}
                                submit={showModal}
                            />
                            <Button
                                className={'disabled'}
                                title={'Add to draft'}
                                submit={submit}
                                disabled={true}
                            />
                        </div>
                    </form>
                )}
            </div>
            <BulkModal
                visible={isBulkUpload}
                handleCancel={() => setBulkUpload(false)}
                accounts={accounts}
            />
            <ScheduleModal
                visible={isSchedulerVisible}
                handleOk={validateScheduler}
                scheduleDate={scheduleDate}
                setScheduleDate={setScheduleDate}
                handleCancel={() => setisSchedulerVisible(false)}
            />
        </div>
    );
};
