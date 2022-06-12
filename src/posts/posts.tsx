import React, {useEffect, useState} from 'react';
import {GetAccountsByCategory, GetAccountsWithoutCategory, GetCategories, PostMessage} from '../services/services';
import {clickOnList} from '../shared/helpers/function';
import {DropdownField} from '../shared/Input/Dropdown';
import {AccountCard} from '../shared/Account/AccountCard';
import './Posts.scss';
import {Button} from '../shared/Input/Button';
import {TabsInput} from '../shared/Tabs/Tabs/Tabs';
import {v4 as uuidv4} from 'uuid';
import {toast} from 'react-toastify';
import {useNavigate, useOutletContext} from 'react-router-dom';
import {ScheduleModal} from './schedule-modal/schedule-modal';
import {DownOutlined, SettingOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Button as Btn, Dropdown, Menu} from 'antd';
import {BulkModal} from './bulk-modal/bulk-modal';
import {IUser} from '../interface/IUser';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DefaultPicture from '../asset/images/default-image.jpg';
import {SplashModal} from './splash-modal/splash-modal';
import {CloseOutlined} from '@ant-design/icons/lib';

export const Posts = () => {

    const user = useOutletContext<IUser>();

    const [accounts, setAccounts] = useState([]);
    const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
    const [message, setMessage] = useState('');
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [categories, setCategories] = useState([]);

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [dropdownValue, setDropdownValue] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUnSplash, setIsLoadingUnSplash] = useState(false);

    const [category, setCategory] = useState(null);

    const [isSchedulerVisible, setisSchedulerVisible] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(null);

    const [isBulkUpload, setBulkUpload] = useState(false);

    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const navigate = useNavigate();

    async function loadCategories() {
        const categories = await GetCategories(navigate);
        setCategories(categories);

        const catego = categories.map((category: {label: string}) => {
            return category.label;
        });
        if (user.user.user_type == 'ADMIN') {
            catego.push('Without a group');
        } else {
            if (categories) {
                setAccounts(await GetAccountsByCategory(navigate, categories[0].id));
            }
        }
        const reverseList = catego.reverse();
        setDropdownValue(reverseList[0]);
        setDropdownOptions(reverseList);
    }

    async function loadAccounts() {
        const accounts = await GetAccountsWithoutCategory(navigate);
        setAccounts(accounts);
    }

    useEffect(() => {
        if (user) {
            setIsLoadingAccounts(true);
            loadAccounts().then(r => {
                loadCategories().then(r => {
                    setTimeout(function() {
                        setIsLoadingAccounts(false);
                    }, 1000);
                });
            });
        }
    }, [user]);

    const submit = (schedulerPayload = {}) => {
        setIsLoading(true);
        const activeAccounts = accounts.filter(function(account) {
            return account.isActive === true;
        });

        const payload = {
            accounts: activeAccounts,
            message: message,
            imageURLs: imageURLs,
            images: images,
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
                    setImageURLs([]);
                    setImages([]);
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
        setImageURLs([]);
        setImages([]);
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

    const removeImgUrl = (uri) => {
        const res = imageURLs.filter(imageURI => imageURI !== uri);
        setImageURLs(res);
    };

    return (
        <div className={'posts-wrapper'}>
            <div className={'selection-wrapper'}>
                <DropdownField
                    placeholder={'Select a group'}
                    options={dropdownOptions}
                    onChange={onDropdownChange}
                    controlClassName={'medium-dropdown'}
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
                    isLoadingAccounts={isLoadingAccounts}
                    setAccounts={setAccounts}
                />
            </ul>
            <div>
                <form className={'post-form'}>
                    <div className={'flex-left'}>
                        <div className="text-area-wrapper">
                            <TabsInput
                                message={message}
                                handleChange={(event) => setMessage(event.target.value)}
                                onEmojiClick={onEmojiClick}
                                onUnSplashClick={setIsLoadingUnSplash}
                                onChangeFile={(e) => {
                                    setImages([...images, e.target.files[0]]);
                                    setImageURLs([...imageURLs, URL.createObjectURL(e.target.files[0])]);
                                }}

                            />
                        </div>
                        <div className={'images-wrapper'}>
                            <div className={'flex-center'}>
                                {imageURLs.length >= 1 ?
                                    <div className={'image-wrapper'}><img src={imageURLs[0]} height={125} width={125}
                                                                          alt={'test'}/><CloseOutlined
                                        onClick={() => removeImgUrl(imageURLs[0])} className={'absolute-delete'}/>
                                    </div> :
                                    <img src={DefaultPicture} height={125} width={125} alt={'test'}/>}
                                {imageURLs.length >= 2 ?
                                    <div className={'image-wrapper'}><img src={imageURLs[1]} height={125} width={125}
                                                                          alt={'test'}/><CloseOutlined
                                        onClick={() => removeImgUrl(imageURLs[1])} className={'absolute-delete'}/>
                                    </div> :
                                    <img src={DefaultPicture} height={125} width={125} alt={'test'}/>}
                            </div>
                            <div className={'flex-center'}>
                                {imageURLs.length >= 3 ?
                                    <div className={'image-wrapper'}><img src={imageURLs[2]} height={125} width={125}
                                                                          alt={'test'}/><CloseOutlined
                                        onClick={() => removeImgUrl(imageURLs[2])} className={'absolute-delete'}/>
                                    </div> :
                                    <img src={DefaultPicture} height={125} width={125} alt={'test'}/>}
                                {imageURLs.length >= 4 ?
                                    <div className={'image-wrapper'}><img src={imageURLs[3]} height={125} width={125}
                                                                          alt={'test'}/><CloseOutlined
                                        onClick={() => removeImgUrl(imageURLs[3])} className={'absolute-delete'}/>
                                    </div> :
                                    <img src={DefaultPicture} height={125} width={125} alt={'test'}/>}
                            </div>
                        </div>
                    </div>

                    <div className={'button-wrapper '}>
                        <Button
                            className={'big-square blue'}
                            title={'Post now'}
                            disabled={isLoading}
                            isLoading={isLoading}
                            submit={() => submit({})}
                        />
                        <Button
                            className={'big-square red'}
                            title={'Schedule'}
                            submit={showModal}
                        />
                        <Button
                            className={'big-square green disabled'}
                            title={'Add to draft'}
                            submit={submit}
                            disabled={true}
                        />
                    </div>
                </form>
            </div>
            <SplashModal
                visible={isLoadingUnSplash}
                handleCancel={() => {
                    setIsLoadingUnSplash(false);
                }}
                setImageURLs={setImageURLs}
                imageURLs={imageURLs}
            />
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
