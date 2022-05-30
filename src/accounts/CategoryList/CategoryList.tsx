import React from 'react';
import {
    CloseCategory,
    GetAccountsByCategory,
    GetAccountsWithoutCategory,
    GetCategory,
} from '../../services/services';
import {CloseCircleFilled, FormOutlined} from '@ant-design/icons';
import {useNavigate, useOutletContext} from 'react-router-dom';
import {IUser} from '../../interface/IUser';

export const CategoryList = (props) => {
    const navigate = useNavigate();
    const user = useOutletContext<IUser>();

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
            props.setter.setColor(r.color);
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
                                <div>
                                    <span
                                        style={{
                                            borderRadius: '50px',
                                            margin: '5px',
                                            backgroundColor: category.color,
                                            height: '20px',
                                            display: 'block',
                                            width: '20px',
                                        }}
                                    />
                                    {category.label} ({category.accounts.length}
                                    )
                                    {user?.user.user_type === "ADMIN" &&                                     <CloseCircleFilled
                                        onClick={() =>
                                            closeConnection(category.id)
                                        }
                                    />}

                                    <FormOutlined
                                        onClick={() =>
                                            editCategoryModal(category.id)
                                        }
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};
