import './billing.scss';
import React, {useEffect, useState} from 'react';
import {errorsHandlersGET, getUserInfos} from '../../services/services';
import {useNavigate} from 'react-router';
import {deviseMapper, formatDate, formatPythonDate, formatStripePrice} from '../../shared/tools/formatter';
import {AddCard} from './Modal/AddCard';
import {Button} from '../../shared/Input/Button';
import {createCustomer} from '../../services/Stripe';
import {toast} from 'react-toastify';
import {FilePdfOutlined, CloseOutlined, CheckOutlined} from '@ant-design/icons';

export const Billing = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [invoices, setInvoices] = useState([]);

    const [currentPrice, setCurrentPrice] = useState(0.0);
    const [numberAccount, setNumberAccounts] = useState(0);
    const [numberUsers, setNumberUsers] = useState(0);

    const [endFreeTrial, setEndFreeTrial] = useState(formatDate(new Date()));
    const [isCardModalVisible, setIsCardModalVisible] = useState(false);

    const [card, setCard] = useState(null);
    const [freePlanLeft, setFreePlanLeft] = useState(0);

    async function loadData() {
        const res = await errorsHandlersGET(getUserInfos(), navigate);

        const diff_days =
            new Date(res.end_free_trial * 1000).getTime() -
            new Date().getTime();

        setFreePlanLeft(Math.round(diff_days / (1000 * 3600 * 24)));

        setCurrentPrice(res.current_price);
        setNumberAccounts(res.current_accounts);
        setNumberUsers(res.current_users);
        setEndFreeTrial(formatPythonDate(res.end_free_trial));
        setCard(res.card);
        setInvoices(res.invoices);
        return;
    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isCardVisible = () => {
        setIsCardModalVisible(!isCardModalVisible);
    };

    const closeCardModal = () => {
        setIsCardModalVisible(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const saveCard = (payload) => {
        createCustomer(payload)
            .then((r) => {
                toast.info(r.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                loadData().then((r) => {
                    console.log(r);
                    setIsCardModalVisible(false);
                });
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    navigate('/');
                }

                toast.error(error.response.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                return error;
            });
    };
    return (
        <div className={'billing-wrapper'}>
            <div className={'billing-section'}>
                <div className={'billing-title'}>
                    <h4>Billing information</h4>
                </div>
                <div className={'billing-content'}>
                    <div className={'stripe-card'}>
                        {card ? (
                            <div className={'billing-card-button'}>
                                <div>
                                    Billed to {card.brand} card ending in{' '}
                                    {card.last4} expiring in {card.exp_month}/
                                    {card.exp_year}
                                </div>
                                <div>
                                    <Button
                                        className={'big-square-blue'}
                                        submit={isCardVisible}
                                        title={'Change credit card'}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={'billing-card-button'}>
                                <div>
                                    {freePlanLeft <= 0
                                        ?  currentPrice !== 0 ? 'You need to activate your payment to continue using the platform.': 'You are account is for free, enjoy our service !'
                                        : `In ${freePlanLeft} days, you will need to activate your payment.`}
                                </div>
                                <div>
                                    {currentPrice !== 0 &&                                     <Button
                                        className={'big-square-blue'}
                                        submit={isCardVisible}
                                        title={'Add credit card'}
                                    />}
                                </div>
                            </div>
                        )}
                    </div>
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <td>Number of Accounts connected</td>
                                <td>{numberAccount}</td>
                                <td />
                            </tr>
                            <tr>
                                <td>Number of users connected</td>
                                <td>{numberUsers}</td>
                                <td />
                            </tr>
                            <tr>
                                <td>Current Usage</td>
                                <td>{currentPrice}€</td>
                                <td />
                            </tr>
                            <tr>
                                <td>End free trial</td>
                                <td>{endFreeTrial}</td>
                                <td />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr />
            <div className={'invoice-section'}>
                <div className={'billing-title'}>
                    <h4>Invoices</h4>
                </div>
                <div className={'billing-content'}>
                    <table>
                        <tbody>
                            {invoices.map((invoice) => {
                                return (
                                    <tr key={invoice.id}>
                                        <td>{ new Intl.DateTimeFormat('en-GB', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric'}).format(new Date(invoice.created * 1000))}</td>
                                        <td>{formatStripePrice(invoice.amount_paid) + " " + deviseMapper(invoice.currency)}</td>
                                        <td>{invoice.amount_paid === invoice.amount_paid ? <CheckOutlined className={'green-paid'} />:  <CloseOutlined className={'red-unpaid'}/>}</td>
                                        <td>{invoice.amount_paid === invoice.amount_paid ? <FilePdfOutlined className={'invoice-paid'} onClick={() => {
                                            window.open(invoice.invoice_pdf, '_blank');
                                        }} />: <FilePdfOutlined className={'invoice-unpaid'}/>}</td>
                                    </tr>
                                );
                            })}
                            {invoices.length === 0 ? (
                                <tr>
                                    <td colSpan={3}>No invoices.</td>
                                </tr>
                            ) : (
                                ''
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddCard
                isVisible={isCardModalVisible}
                onCancel={closeCardModal}
                handleOk={saveCard}
            />
        </div>
    );
};
