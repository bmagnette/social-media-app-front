import React from 'react';
import {
    CloseCategory,
    GetAccountsByCategory,
    GetAccountsWithoutCategory,
    GetCategory,
} from '../../services/services';
import {CloseCircleFilled, FormOutlined} from '@ant-design/icons';

export const CategoryList = (props) => {
    const closeConnection = (_id) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        CloseCategory(_id).then((r) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            props.loadCategories().then((r) => {
                GetAccountsWithoutCategory().then((r) => {
                    props.setter.setNoCategoryAccounts(r);
                });
            });
        });
    };

    const editCategoryModal = (_id) => {
        GetCategory(_id).then((r) => {
            props.setter.setEditable(_id);
            props.setter.setVisible(true);
            props.setter.setCategoryName(r.label);
            props.setter.setCategoryDescription(r.description);
            GetAccountsByCategory(_id).then((r) =>
                props.setter.setActiveAccounts(r),
            );
            GetAccountsWithoutCategory().then((r) => {
                props.setter.setNoCategoryAccounts(r);
                props.setter.setNoCategoriesAccounts(r);
            });
        });
    };

    return (
        <>
            {props.categories !== null && (
                <ul>
                    {props.categories.map((category) => {
                        return (
                            <li key={category.id}>
                                {category.label} - {category.description}
                                <CloseCircleFilled
                                    onClick={() => closeConnection(category.id)}
                                />
                                <FormOutlined
                                    onClick={() =>
                                        editCategoryModal(category.id)
                                    }
                                />
                            </li>
                        );
                    })}
                    {props.categories.length === 0 ? (
                        <div className={'bull-info'}>
                            There is not category yet.
                        </div>
                    ) : (
                        ''
                    )}
                </ul>
            )}
        </>
    );
};
