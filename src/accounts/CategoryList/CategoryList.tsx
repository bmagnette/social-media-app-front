import React, {useState} from 'react';
import {CloseCategory, GetAccountsByCategory, GetAccountsWithoutCategory, GetCategory} from '../../services/services';
import {CloseCircleFilled, FormOutlined} from '@ant-design/icons';
import {useNavigate, useOutletContext} from 'react-router-dom';
import {IUser} from '../../interface/IUser';
import {WarningModal} from '../../shared/Modal/warning-modal/warning-modal';
import Spinner from '../../shared/spinner/Spinner';

export const CategoryList = (props) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [categoryClicked, setCategoryClicked] = useState(null);
    const navigate = useNavigate();
    const user = useOutletContext<IUser>();

    const closeConnection = () => {
        setIsLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        CloseCategory(navigate, categoryClicked).then((r) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            props.loadCategories().then((r) => {
                GetAccountsWithoutCategory(navigate).then((r) => {
                    props.setter.setNoCategoryAccounts(r);
                    setIsLoading(false);
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
            {isLoading && <Spinner/>}
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
                                {user?.user.user_type === 'ADMIN' && <CloseCircleFilled
                                    onClick={() => {
                                        setIsDeleting(true);
                                        setCategoryClicked(category.id);
                                    }
                                    }
                                />}
                                {user?.user.user_type == 'ADMIN' && (
                                    <FormOutlined
                                        onClick={() =>
                                            editCategoryModal(category.id)
                                        }
                                    />)}
                            </div>
                        </li>
                    );
                })}
            </ul>
            <WarningModal
                visible={isDeleting}
                handleOk={() => {
                    closeConnection();
                    setIsDeleting(false);
                    setIsLoading(false);
                    setCategoryClicked(null);
                }}
                handleCancel={() => {
                    setIsDeleting(false);
                    setIsLoading(false);
                    setCategoryClicked(null);
                }}
                submitButtonType={'danger'}
                isLoading={isLoading}
                actionLabel={'Delete'}
                message={'Do you want to delete this group ?'}
            />
        </>
    );
};
