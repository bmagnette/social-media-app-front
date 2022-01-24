import React, {useEffect, useState} from 'react';
import {
    CloseAccount,
    errorsHandlers,
    GetAccountsWithoutCategory,
    GetCategories,
} from '../services/services';
import {ModalCategory} from './ModalCategory/ModalCategory';
import {CategoryList} from './CategoryList/CategoryList';
import {AccountCard} from '../shared/Account/AccountCard';
import './accounts.scss';
import {Button} from '../shared/Input/Button';
import {ConnectButtons} from './ConnectButtons/ConnectButtons';
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from 'react-router-dom';

export const Accounts = () => {
    const [categories, setCategories] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [accounts, setAccounts] = useState([]);
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        errorsHandlers(CloseAccount(navigate, _id), navigate).then((r) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            loadCategories().then((r) => {
                GetAccountsWithoutCategory(navigate).then((r) => {
                    setNoCategoryAccounts(r);
                });
            });
        });
    };

    useEffect(() => {
        if (!categories) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            loadCategories().then((r) => {
                GetAccountsWithoutCategory(navigate).then((r) => {
                    setNoCategoryAccounts(r);
                    return;
                });
                return;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories, setCategories, navigate]);

    const showModal = () => {
        setVisible(true);
        GetAccountsWithoutCategory(navigate).then((r) => {
            setNoCategoriesAccounts(r);
        });
    };
    const setterCategory = {
        setEditable,
        setVisible,
        setCategoryName,
        setCategoryDescription,
        setNoCategoryAccounts,
        setActiveAccounts,
        setNoCategoriesAccounts,
        setAccounts,
    };

    const modalParams = {
        setCategoryName,
        setCategoryDescription,
        setNoCategoryAccounts,
        setActiveAccounts,
        setLoading,
        categoryName,
        categoryDescription,
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

    return (
        <div className={'account-page-wrapper'}>
            <div className={'account-wrapper'}>
                <ConnectButtons navigate={navigate} />
                {categories !== null && (
                    <ul>
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

                        {noCategoryAccounts.length === 0 ? (
                            ''
                        ) : (
                            <>
                                <h3>Account without category</h3>
                                <AccountCard
                                    key={uuidv4()}
                                    accounts={noCategoryAccounts}
                                    closeConnection={closeConnection}
                                />
                            </>
                        )}
                        {categories.length === 0 &&
                        noCategoryAccounts.length === 0 ? (
                            <div className="bull-info">
                                Connect an account to start posting content.
                            </div>
                        ) : (
                            ''
                        )}
                    </ul>
                )}
            </div>
            <div className={'category-wrapper'}>
                <Button
                    className={'big-square-blue'}
                    submit={showModal}
                    title={'Add category'}
                />
                <ModalCategory modalParams={modalParams} />
                <CategoryList
                    categories={categories}
                    loadCategories={loadCategories}
                    setter={setterCategory}
                />
            </div>
        </div>
    );
};
