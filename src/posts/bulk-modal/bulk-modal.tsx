import {Button, DatePicker, Modal, Upload} from 'antd';
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {UploadOutlined} from '@ant-design/icons';
import './bulk-modal.scss';
import {AccountCard} from '../../shared/Account/AccountCard';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import {CheckCircleOutlined} from '@mui/icons-material';
import {ExclamationCircleOutlined} from '@ant-design/icons/lib';
import {BulkUpload, GetAccounts, GetAccountsWithoutCategory} from '../../services/services';
import {useNavigate} from 'react-router';

interface message {
    date: string;
    content: string;
    id: number | null;
    image_url: string;
}

export const BulkModal = (props) => {
    const [accounts, setAccounts] = useState([]);
    const [isUpload, setIsUpload] = useState(false);
    const [isBulkReady, setIsBulkReady] = useState(false);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState<message>({
        date: '',
        content: '',
        id: null,
        image_url: '',
    });
    const navigate = useNavigate();

    async function loadAccounts() {
        const accounts = await GetAccounts(navigate);
        setAccounts(accounts);
    }

    useEffect(() => {
        loadAccounts();
    }, []);

    const handleSubmit = () => {
        const payload = {
            messages: messages
        };
        BulkUpload(navigate, payload).then(resp => {
            console.log(resp);

            toast.error(resp, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            handleCancel();
        });
    };

    const handleCancel = () => {
        setIsUpload(false);
        setIsBulkReady(false);
        setMessages([]);
        props.handleCancel();
    };

    const test = {
        name: 'file',
        action: 'http://localhost:5000/batch/bulk',
        accept: '.csv',
        headers: {
            Authorization: localStorage.getItem('TOKEN'),
            'Access-Control-Allow-Origin': '*',
        },
        onChange(info) {
            if (info.file.status === 'done') {
                setIsUpload(true);

                const data = info.file.response.data.map((message) => {
                    message['status'] = false;
                    return message;
                });
                setMessages(data);
                setMessage(info.file.response.data[0]);
            } else if (info.file.status === 'error') {
                toast.error(info.file.response.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        },
    };

    const clickOnList = (_id, accounts) => {

        const newList = accounts.map((account) => {
            if(account.id === _id){
                if(account.isActive === true){
                    account["isActive"] = false;
                } else{
                    account["isActive"] = true;
                }
            } else{
                account["isActive"] = false;
            }
            return account
        });

        setAccounts(newList);
    };

    const validatePost = () => {
        const selectedAccount = accounts.find(account => account?.isActive === true);
        if(!selectedAccount){
            toast.error('No account selected !', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }

        if(!message.content){
            toast.error('Your message is empty !', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }

        const newMessages = messages.map(curMessage => {
            if(curMessage.id === message.id){
                curMessage.status = true;
                curMessage.account = selectedAccount;
            }
            return curMessage;
        });

        setMessages(newMessages);

        const nbReadyMessage = newMessages.filter(message => {
            if(message?.status === true){
                return true;
            }
        }).length;

        if(nbReadyMessage === messages.length){
            setIsBulkReady(true);
        }
    };

    return (
        <Modal
            visible={props.visible}
            width={isUpload ? 1000 : undefined}
            onOk={handleSubmit}
            onCancel={handleCancel}
            footer={
                isUpload && (
                    <>
                        <Button key="back" onClick={handleCancel}>
                            Return
                        </Button>
                        <Button
                            key="submit"
                            type="primary"
                            onClick={validatePost}>
                            Validate post
                        </Button>
                        <Button
                            disabled={!isBulkReady}
                            key="submit"
                            type="primary"
                            onClick={handleSubmit}>
                            Save bulk upload
                        </Button>
                    </>
                )
            }>
            {!isUpload ? (
                <div>
                    <h4>Upload your CSV file</h4>
                    <ul>
                        <li>First column : Date (format : YYYY-MM-DD HH:mm)</li>
                        <li>Second column : Message</li>
                        <li>Third column : image_url</li>
                    </ul>
                    <Upload {...test}>
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>
                </div>
            ) : (
                <div className="bulk-settings">
                    <div className={'bulk-list-messages'}>
                        <div key={'initial'} className="bulk-message">
                            Messages to save :
                        </div>
                        {messages.map((message) => {
                            return (
                                <div
                                    key={message.id}
                                    className="bulk-message"
                                    onClick={() => {
                                        const res = messages.find(
                                            (msg) => msg.id === message.id,
                                        );
                                        setMessage(res);

                                        const newList = accounts.map((account) => {
                                            account["isActive"] = false;
                                            return account
                                        });
                                        setAccounts(newList);
                                    }}>
                                    <p>{message.content.slice(0, 20)}</p>{' '}
                                    {message.status ? (
                                        <CheckCircleOutlined />
                                    ) : (
                                        <ExclamationCircleOutlined />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={'bulk-list-title'}>
                        <h3>Link your messages with your accounts.</h3>
                        {message && (
                            <>
                                <AccountCard
                                    key={uuidv4()}
                                    accounts={accounts}
                                    clickOnList={clickOnList}
                                    className={'no-context-style'}
                                />
                                <div className={'bulk-message-schedule-time'}>
                                    Will be publish on
                                    <DatePicker
                                        format="YYYY-MM-DD HH:mm"
                                        disabled={true}
                                        value={moment(message.date)}
                                    />
                                </div>
                                <div className={'bulk-message-content'}>
                                    Content : <br />
                                    {message.content}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </Modal>
    );
};
