import './billing.scss';
import React, {useEffect, useState} from 'react';
import {
    errorsHandlersGET,
    getPrice,
    getAccountsNumber,
    getEndFreeTrial,
} from '../services/services';
import {useNavigate} from 'react-router';
import {formatDate, formatPythonDate} from '../shared/tools/formatter';

export const Billing = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [invoices, setInvoices] = useState([]);

    const [currentPrice, setCurrentPrice] = useState(0.0);
    const [numberAccount, setNumberAccounts] = useState(1);
    const [endFreeTrial, setEndFreeTrial] = useState(formatDate(new Date()));

    async function loadData() {
        setCurrentPrice(await errorsHandlersGET(getPrice(), navigate));
        setNumberAccounts(
            await errorsHandlersGET(getAccountsNumber(), navigate),
        );
        setEndFreeTrial(
            formatPythonDate(
                await errorsHandlersGET(getEndFreeTrial(), navigate),
            ),
        );
    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={'billing-wrapper'}>
            <div className={'billing-section'}>
                <div className={'billing-title'}>
                    <h4>Billing information</h4>
                </div>
                <div className={'billing-content'}>
                    <div className={'stripe-card'}>
                        <div>
                            This account is billed to Visa card ending in 9630
                        </div>
                        <div className={'billing-card-button'}>
                            <button>Add credit card</button>
                            <button>Remove credit card</button>
                            <button>Change credit card</button>
                        </div>
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
        </div>
    );
};
