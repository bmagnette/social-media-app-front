import React, {useEffect, useState} from 'react';
import {CloseAccount, errorsHandlers, GetAccountsWithoutCategory, GetCategories} from '../services/services';
import {ModalCategory} from './ModalCategory/ModalCategory';
import {CategoryList} from './CategoryList/CategoryList';
import {AccountCard} from '../shared/Account/AccountCard';
import './accounts.scss';
import {Button} from '../shared/Input/Button';
import {ConnectButtons} from './ConnectButtons/ConnectButtons';
import {v4 as uuidv4} from 'uuid';
import {useNavigate, useOutletContext} from 'react-router-dom';
import {IUser} from '../interface/IUser';
import Spinner from '../shared/spinner/Spinner';
import {InfoMessage} from '../shared/info-message/info-message';

export const Accounts = () => {
    const user = useOutletContext<IUser>();

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [color, setColor] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [accounts, setAccounts] = useState([]);
    const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
    const [noCategoryAccounts, setNoCategoryAccounts] = useState([]);

    // For modal
    const [activeAccounts, setActiveAccounts] = useState([]);
    const [noCategoriesAccounts, setNoCategoriesAccounts] = useState([]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tempActiveAccount, setTempActiveAccount] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tempNoAccount, setTempNoAccount] = useState([]);

    const [isVisible, setVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isEditable, setEditable] = useState(null);
    const navigate = useNavigate();

    async function loadCategories() {
        setCategories(await GetCategories(navigate));
    }

    const closeConnection = (_id) => {
        setIsLoadingAccounts(true);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        errorsHandlers(CloseAccount(navigate, _id), navigate).then((r) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            loadCategories().then((r) => {
                GetAccountsWithoutCategory(navigate).then((r) => {
                    setIsLoadingAccounts(false);
                    setNoCategoryAccounts(r);
                });
            });
        });
    };

    useEffect(() => {
        setIsLoadingAccounts(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        loadCategories().then((r) => {
            GetAccountsWithoutCategory(navigate).then((r) => {
                setNoCategoryAccounts(r);
                setIsLoadingAccounts(false);
                return;
            });
            return;
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showModal = () => {
        setVisible(true);
        GetAccountsWithoutCategory(navigate).then((r) => {
            setNoCategoriesAccounts(r);
        });
    };
    const setterCategory = {
        setEditable,
        setVisible,
        setColor,
        setCategoryName,
        setNoCategoryAccounts,
        setActiveAccounts,
        setNoCategoriesAccounts,
        setAccounts,
    };

    const modalParams = {
        setColor,
        color,
        setCategoryName,
        setNoCategoryAccounts,
        setActiveAccounts,
        setLoading,
        categoryName,
        isEditable,
        loadCategories,
        setNoCategoriesAccounts,
        setVisible,
        setAccounts,
        isVisible,
        isLoading,
        setEditable,
        noCategoryAccounts,
        activeAccounts,
        noCategoriesAccounts,
        setTempActiveAccount,
        setTempNoAccount,
        tempNoAccount,
        tempActiveAccount,
    };

    // Get all account who are going to expired in 7 days
    const expirationLimit = 7;
    let accountsWithGroupExpired = [];
    categories.filter(category => {
        const test =  category.accounts.filter(account => {
            const futureExpired = new Date(account.updated_at * 1000).getTime() + (account.expired_in * 1000);
            const daysDiff = (futureExpired - new Date().getTime()) / (1000 * 3600 * 24);
            if (daysDiff <= expirationLimit) {
                account["day_before_expiration"] = daysDiff;
                return account;
            }
        });
        accountsWithGroupExpired = accountsWithGroupExpired.concat(test)
    });

    const NoCategoryAccountsExpiredIn7Days = noCategoryAccounts.filter(account => {
        const futureExpired = new Date(account.updated_at * 1000).getTime() + (account.expired_in * 1000);
        const daysDiff = (futureExpired - new Date().getTime()) / (1000 * 3600 * 24);
        if (daysDiff <= expirationLimit) {
            account["day_before_expiration"] = daysDiff;
            return account;
        }
    });

    let accountsExpired = accountsWithGroupExpired.concat(NoCategoryAccountsExpiredIn7Days);

    return (
        <div className={'account-page-wrapper'}>
            <div className={'account-wrapper'}>
                <ConnectButtons navigate={navigate}/>
                <h2>Connected accounts</h2>
                <hr/>
                {isLoadingAccounts && <Spinner/>}

                <ul>
                    {!isLoadingAccounts && <>
                        <InfoMessage
                            type={'warning'}
                            description={'Expiring accounts'}
                            list={accountsExpired}
                        />
                        {categories.map((category) => {
                            return (
                                <div key={uuidv4()}>
                                    <h3>{category.label}</h3>
                                    <AccountCard
                                        key={uuidv4()}
                                        accounts={category.accounts}
                                        closeConnection={closeConnection}
                                    />
                                </div>
                            );
                        })}

                        {noCategoryAccounts.length !== 0 && (
                            <>
                                <h3>Account without group</h3>
                                <AccountCard
                                    key={uuidv4()}
                                    accounts={noCategoryAccounts}
                                    closeConnection={closeConnection}
                                />
                            </>
                        )}
                        {categories.length === 0 &&
                        noCategoryAccounts.length === 0 && (
                            <div className="bull-info">
                                Connect an account to start posting content.
                            </div>
                        )}
                    </>}
                </ul>
            </div>
            <div className={'category-wrapper'}>
                <div className={'flex'}>
                    <div>
                        <h2>Account Groups</h2>
                    </div>

                    {user?.user.user_type == 'ADMIN' && <div><Button
                        className={'big-square-blue center-add-group'}
                        submit={showModal}
                        title={'Add group'}
                    /></div>}

                </div>

                <ModalCategory modalParams={modalParams}/>
                <CategoryList
                    categories={categories}
                    loadCategories={loadCategories}
                    setter={setterCategory}
                />
            </div>
        </div>
    );
};
