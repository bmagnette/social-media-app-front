import React from 'react';
import {
    CloseCategory,
    GetAccountsByCategory,
    GetAccountsWithoutCategory,
    GetCategory,
} from '../../services/services';
import {CloseCircleFilled, FormOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

export const CategoryList = (props) => {
    const navigate = useNavigate();
    const closeConnection = (_id) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        CloseCategory(navigate, _id).then((r) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            props.loadCategories().then((r) => {
                GetAccountsWithoutCategory(navigate).then((r) => {
                    props.setter.setNoCategoryAccounts(r);
                });
            });
        });
    };

    const editCategoryModal = (_id) => {
        GetCategory(navigate, _id).then((r) => {
            props.setter.setEditable(_id);
            props.setter.setVisible(true);
            props.setter.setCategoryName(r.label);
            props.setter.setCategoryDescription(r.description);
            GetAccountsByCategory(navigate, _id).then((r) =>
                props.setter.setActiveAccounts(r),
            );
            GetAccountsWithoutCategory(navigate).then((r) => {
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
                </ul>
            )}
        </>
    );
};
