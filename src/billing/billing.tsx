import './billing.scss';
import React, {useEffect, useState} from 'react';
import {errorsHandlersGET, getUserInfos} from '../services/services';
import {useNavigate} from 'react-router';
import {formatDate, formatPythonDate} from '../shared/tools/formatter';
import {AddCard} from './Modal/AddCard';
import {Button} from '../shared/Input/Button';
import {createCustomer} from '../services/Stripe';
import {toast} from 'react-toastify';

export const Billing = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [invoices, setInvoices] = useState([]);

    const [currentPrice, setCurrentPrice] = useState(0.0);
    const [numberAccount, setNumberAccounts] = useState(0);
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
        setEndFreeTrial(formatPythonDate(res.end_free_trial));
        setCard(res.card);
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
                    navigate('/login');
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
                                    In {freePlanLeft} days, you will need to
                                    activate your payment.
                                </div>
                                <div>
                                    <Button
                                        className={'big-square-blue'}
                                        submit={isCardVisible}
                                        title={'Add credit card'}
                                    />
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
                                        <td>December 2021</td>
                                        <td>{invoice.amount_ttc}</td>
                                        <td>{invoice.status}</td>
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
