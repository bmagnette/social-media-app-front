import React, {useState} from 'react';
import Cards from 'elt-react-credit-cards';
import 'elt-react-credit-cards/lib/styles.scss';
export const PaymentForm = () => {
    const [number, setNumber] = useState('');
    const [expiry, setExpiry] = useState();
    const [cvc, setCVC] = useState();

    const [focus, setFocus] = useState();
    const [name, setName] = useState();

    const handleInputFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleInputChange = (e) => {
        setNumber(e.target.value);
    };

    const handleExpiry = (e) => {
        setExpiry(e.target.value);
    };

    const handleCVC = (e) => {
        setCVC(e.target.value);
    };

    const handleName = (e) => {
        setName(e.target.value);
    };

    return (
        <div id="PaymentForm">
            <Cards
                cvc={cvc}
                expiry={expiry}
                focused={focus}
                name={name}
                number={number}
            />
            <form>
                <input
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <input
                    type="tel"
                    name="expiry"
                    placeholder="expiry"
                    onChange={handleExpiry}
                />
                <input
                    type="tel"
                    name="cvc"
                    placeholder="cvc"
                    onChange={handleCVC}
                />
                <input
                    type="tel"
                    name="name"
                    placeholder="name"
                    onChange={handleName}
                />
            </form>
        </div>
    );
};
