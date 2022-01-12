import React from 'react';
import {
    closeCategory,
    getAccountsByCategory,
    getCategory,
} from '../../services/services';
import {CloseCircleFilled, FormOutlined} from '@ant-design/icons';

export const CategoryList = (props) => {
    const closeConnection = (_id) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        closeCategory(_id).then((r) => {
            props.loadCategories().then((r) => console.log(r));
        });
    };

    const editCategoryModal = (_id) => {
        getCategory(_id).then((r) => {
            props.setter.setEditable(_id);
            props.setter.setVisible(true);
            props.setter.setCategoryName(r.label);
            props.setter.setCategoryDescription(r.description);
            getAccountsByCategory(_id).then((r) =>
                props.setter.setActiveAccounts(r),
            );
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
                    {props.categories.length === 0
                        ? 'There is not category yet.'
                        : ''}
                </ul>
            )}
        </>
    );
};
