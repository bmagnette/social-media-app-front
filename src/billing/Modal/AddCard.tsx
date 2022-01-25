import {Modal} from 'antd';
import React, {useState} from 'react';
import './AddCard.scss';
import Cards from 'elt-react-credit-cards';
import 'elt-react-credit-cards/lib/styles.scss';

export const AddCard = (props) => {
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [CVC, setCVC] = useState('');
    const [holder, setHolder] = useState('');
    const [focus, setFocus] = useState();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorMessage, setErrorMessage] = useState('');
    const handleInputFocus = (e) => {
        setFocus(e.target.name);
    };

    const onCreditCardChange = (event) => {
        if (event.target.value.length <= 16) {
            setCreditCardNumber(event.target.value);
        }
    };

    const onExpirationDateChange = (event) => {
        let textTemp = event.target.value;
        if (textTemp[0] !== '1' && textTemp[0] !== '0') {
            textTemp = '';
        }
        if (textTemp.length === 2) {
            if (
                parseInt(textTemp.substring(0, 2)) > 12 ||
                parseInt(textTemp.substring(0, 2)) == 0
            ) {
                textTemp = textTemp[0];
            } else if (event.target.value.length === 2) {
                textTemp += '/';
            } else {
                textTemp = textTemp[0];
            }
        }
        if (event.target.value.length <= 5) {
            setExpirationDate(textTemp);
        }
    };

    const onCVCChange = (event) => {
        if (event.target.value.length <= 3) {
            setCVC(event.target.value);
        }
    };

    const onHolderChange = (event) => {
        if (event.target.value.length <= 40) {
            setHolder(event.target.value);
        }
    };

    const handleOk = () => {
        const payload = {creditCardNumber, expirationDate, CVC, holder};
        props.handleOk(payload);

        // if (
        //     creditCardNumber.length === 16 &&
        //     expirationDate.length === 5 &&
        //     CVC.length === 3
        // ) {
        //     props.handleOk(payload);
        // } else {
        //     setErrorMessage(
        //         'Credit card data are wrong, there is certainly a typo in your forms.',
        //     );
        // }
    };

    return (
        <Modal
            visible={props.isVisible}
            footer={null}
            okButtonProps={{style: {display: 'none'}}}
            cancelButtonProps={{style: {display: 'none'}}}
            onCancel={props.onCancel}>
            <div>
                <div className={'stripe-modal-title'}>
                    <h3>Add payment card</h3>
                    <h4>Complete your billing profile with a payment card</h4>
                </div>

                <form>
                    <div className={'stripe-modal-form-wrapper'}>
                        <div className="error-message">{errorMessage}</div>
                        <div className={'form-group-wrapper'}>
                            <label>Card Number</label>
                            <input
                                placeholder={'1234 1234 1234 1234'}
                                value={creditCardNumber}
                                onChange={onCreditCardChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                        <div className={'form-group-wrapper'}>
                            <label>Expiration date </label>
                            <input
                                placeholder={'MM / AA'}
                                value={expirationDate}
                                onChange={onExpirationDateChange}
                            />
                        </div>
                        <div className={'form-group-wrapper'}>
                            <label>CVC</label>
                            <input
                                placeholder={'CVC'}
                                value={CVC}
                                onChange={onCVCChange}
                            />
                        </div>
                        <div className={'form-group-wrapper'}>
                            <label>Holder</label>
                            <input
                                placeholder={'M.Dupont'}
                                value={holder}
                                onChange={onHolderChange}
                            />
                        </div>
                        <Cards
                            cvc={CVC}
                            expiry={expirationDate}
                            focused={focus}
                            name={holder}
                            number={creditCardNumber}
                        />
                    </div>
                </form>
            </div>
            <div>
                <button onClick={handleOk} className={'validate-card'}>
                    Add
                </button>
            </div>
        </Modal>
    );
};
