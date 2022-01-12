import {Button, Modal} from 'antd';
import {InputField} from '../../shared/Input/input';
import {clickOnList} from '../../shared/helpers/function';
import React from 'react';
import {addCategory, editCategory} from '../../services/services';

export const ModalCategory = (props) => {
    const {
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
    } = props.modalParams;
    const setCategoryNameField = (e) => {
        setCategoryName(e.target.value);
    };

    const setCategoryDescriptionField = (e) => {
        setCategoryDescription(e.target.value);
    };

    const handleOk = () => {
        setLoading(true);
        const activeAccounts = accounts.filter((account) => {
            return account.isActive === true;
        });
        const payload = {
            accounts: activeAccounts,
            categoryName: categoryName,
            categoryDescription: categoryDescription,
        };

        if (isEditable) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            editCategory(isEditable, payload).then((r) => {
                loadCategories().then((r) => console.log(r));
            });
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            addCategory(payload).then((r) => {
                loadCategories().then((r) => console.log(r));
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
            <h3>Category name</h3>
            <InputField value={categoryName} onChange={setCategoryNameField} />
            <h3>Category description</h3>
            <InputField
                value={categoryDescription}
                onChange={setCategoryDescriptionField}
            />
            <h3>
                {isEditable ? 'Active Accounts' : 'Accounts without categories'}
            </h3>
            {isEditable
                ? activeAccounts.map((account) => {
                      return (
                          <li
                              key={account.id}
                              onClick={() =>
                                  clickOnList(account.id, accounts, setAccounts)
                              }>
                              {account.social_type} {account.first_name}{' '}
                              {account.last_name}{' '}
                              {account?.isActive ? '(actif)' : ''}
                          </li>
                      );
                  })
                : ''}
            {isEditable && activeAccounts.length === 0
                ? 'There is no account with this category.'
                : ''}

            <h3>{isEditable && 'Accounts without categories'}</h3>
            {accounts.map((account) => {
                return (
                    <li
                        key={account.id}
                        onClick={() =>
                            clickOnList(account.id, accounts, setAccounts)
                        }>
                        {account.social_type} {account.first_name}{' '}
                        {account.last_name} {account?.isActive ? '(actif)' : ''}
                    </li>
                );
            })}
            {accounts.length === 0
                ? 'There is no account without category.'
                : ''}
        </Modal>
    );
};
