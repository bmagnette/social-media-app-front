import {Button, Modal} from 'antd';
import {InputField} from '../../shared/Input/input';
import React from 'react';
import {
    AddCategory,
    EditCategory,
    GetAccountsWithoutCategory,
} from '../../services/services';
import {AccountCard} from '../../shared/Account/AccountCard';
import {v4 as uuidv4} from 'uuid';
import {clickOnList} from '../../shared/helpers/function';
import {useNavigate} from 'react-router-dom';

export const ModalCategory = (props) => {
    const {
        setCategoryName,
        setCategoryDescription,
        setNoCategoryAccounts,
        setLoading,
        categoryName,
        categoryDescription,
        isEditable,
        loadCategories,
        setVisible,
        setAccounts,
        isVisible,
        isLoading,
        setEditable,

        setActiveAccounts,
        activeAccounts,
        noCategoriesAccounts,
        setNoCategoriesAccounts,
    } = props.modalParams;
    const navigate = useNavigate();
    const setCategoryNameField = (e) => {
        setCategoryName(e.target.value);
    };

    const setCategoryDescriptionField = (e) => {
        setCategoryDescription(e.target.value);
    };

    const handleOk = () => {
        setLoading(true);

        if (isEditable) {
            const payload = {
                accounts: activeAccounts,
                categoryName: categoryName,
                categoryDescription: categoryDescription,
            };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            EditCategory(navigate, isEditable, payload).then((r) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                loadCategories().then((r) => {
                    GetAccountsWithoutCategory(navigate).then((r) => {
                        setNoCategoryAccounts(r);
                        return;
                    });
                });
            });
        } else {
            const selectedAccounts = noCategoriesAccounts.filter((account) => {
                return account.isActive === true;
            });
            const payload = {
                accounts: selectedAccounts ? selectedAccounts : [],
                categoryName: categoryName,
                categoryDescription: categoryDescription,
            };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            AddCategory(navigate, payload).then((r) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                loadCategories().then((r) => {
                    GetAccountsWithoutCategory(navigate).then((r) => {
                        setNoCategoryAccounts(r);
                        return;
                    });
                });
            });
        }

        handleCancel();
    };

    const handleCancel = () => {
        setVisible(false);
        setLoading(false);
        setCategoryName('');
        setCategoryDescription('');
        setAccounts([]);
        setEditable(null);
    };

    const removeAccount = (id) => {
        const newAccounts = activeAccounts.filter((account) => {
            return account.id !== id;
        });

        const account = activeAccounts.find((account) => {
            return account.id === id;
        });

        noCategoriesAccounts.push(account);
        setActiveAccounts(newAccounts);
    };

    const addAccount = (id) => {
        const toAdd = noCategoriesAccounts.find((account) => {
            return account.id === id;
        });
        const removeAccount = noCategoriesAccounts.filter((account) => {
            return account.id !== id;
        });

        activeAccounts.push(toAdd);
        setNoCategoriesAccounts(removeAccount);
    };

    return (
        <Modal
            visible={isVisible}
            title={isEditable ? 'Modify a category' : 'Add a category'}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={isLoading}
                    onClick={handleOk}>
                    {isEditable ? 'Modify' : 'Create'}
                </Button>,
            ]}>
            <h3>Name</h3>
            <InputField value={categoryName} onChange={setCategoryNameField} />
            <h3>Description</h3>
            <InputField
                value={categoryDescription}
                onChange={setCategoryDescriptionField}
            />
            <h3>{isEditable ? 'Accounts' : 'Accounts available'}</h3>
            {isEditable ? (
                <AccountCard
                    key={uuidv4()}
                    accounts={activeAccounts}
                    clickOnList={removeAccount}
                />
            ) : (
                ''
            )}

            <h3>{isEditable && 'Without categories'}</h3>
            <AccountCard
                key={uuidv4()}
                accounts={noCategoriesAccounts}
                clickOnList={isEditable ? addAccount : clickOnList}
                setAccounts={setAccounts}
            />
        </Modal>
    );
};
