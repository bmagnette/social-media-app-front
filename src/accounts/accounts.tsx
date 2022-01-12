import React, {useEffect, useState} from 'react';
import {
    closeAccount,
    connectFacebookAccount,
    connectLinkedIn,
    connectTwitterAccount,
    getAccountsWithoutCategory,
    getCategories,
} from '../services/services';
import {ModalCategory} from './ModalCategory/ModalCategory';
import {CategoryList} from './CategoryList/CategoryList';
import {AccountCard} from '../shared/Account/AccountCard';
import './accounts.scss';
import {Button} from '../shared/Input/Button';

export const Accounts = () => {
    const [categories, setCategories] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const [accounts, setAccounts] = useState([]);
    const [activeAccounts, setActiveAccounts] = useState([]);

    const [isVisible, setVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isEditable, setEditable] = useState(null);
    const [noCategoryAccounts, setNoCategoryAccounts] = useState(null);

    async function loadCategories() {
        setCategories(await getCategories());
    }

    const closeConnection = (_id) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        closeAccount(_id).then((r) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            loadCategories().then((r) => {
                return;
            });
        });
    };

    useEffect(() => {
        if (!categories) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            loadCategories().then((r) => {
                getAccountsWithoutCategory().then((r) => {
                    setNoCategoryAccounts(r);
                    return;
                });
                return;
            });
        }
    }, [categories, setCategories]);

    const showModal = () => {
        setVisible(true);
        getAccountsWithoutCategory().then((r) => {
            setAccounts(r);
        });
    };

    const setterCategory = {
        setEditable,
        setVisible,
        setCategoryName,
        setCategoryDescription,
        setActiveAccounts,
    };

    const modalParams = {
        setCategoryName,
        setCategoryDescription,
        setLoading,
        accounts,
        categoryName,
        categoryDescription,
        isEditable,
        loadCategories,
        setVisible,
        setAccounts,
        isVisible,
        isLoading,
        setEditable,
        activeAccounts,
    };

    return (
        <div className={'account-page-wrapper'}>
            <div className={'account-wrapper'}>
                <div className={'connexion-wrapper'}>
                    <button onClick={connectTwitterAccount}>
                        Connect Twitter
                    </button>
                    <button onClick={connectFacebookAccount}>
                        Connect Facebook
                    </button>
                    <button onClick={connectLinkedIn}>Connect Instagram</button>
                    <button onClick={connectLinkedIn}>Connect Pinterest</button>
                    <button onClick={connectLinkedIn}>Connect LinkedIn</button>
                </div>
                {categories !== null && (
                    <ul>
                        {categories.map((category) => {
                            return (
                                <>
                                    <h3>{category.label}</h3>
                                    <AccountCard
                                        key={'123'}
                                        accounts={category.accounts}
                                        closeConnection={closeConnection}
                                    />
                                </>
                            );
                        })}
                        {noCategoryAccounts !== null && (
                            <>
                                <h3>Account without category</h3>
                                <AccountCard
                                    key={'123'}
                                    accounts={noCategoryAccounts}
                                    closeConnection={closeConnection}
                                />
                                {categories.length === 0 &&
                                noCategoryAccounts.length === 0
                                    ? 'There is no accounts yet.'
                                    : ''}
                            </>
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
