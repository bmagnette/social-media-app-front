import React, {useEffect, useState} from 'react';
import {
    getAccountsByCategory,
    getAccountsWithoutCategory,
    getCategories,
    postMessage,
} from '../services/services';
// import DatePicker from 'react-datepicker';
// import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import {clickOnList} from '../shared/helpers/function';
import {DropdownField} from '../shared/Input/Dropdown';
import {TextAreaWidget} from './TextAreaWidget';
import {AccountCard} from '../shared/Account/AccountCard';
import './Posts.scss';
import {Button} from '../shared/Input/Button';

export const Posts = () => {
    const [accounts, setAccounts] = useState([]);
    const [message, setMessage] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [categories, setCategories] = useState([]);
    // const [startDate, setStartDate] = useState(new Date());
    // const [value, onChange] = useState('10:00');
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [dropdownValue, setDropdownValue] = useState();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [category, setCategory] = useState(null);

    async function loadCategories() {
        const categories = await getCategories();
        setCategories(categories);

        const catego = categories.map((category: {label: string}) => {
            return category.label;
        });
        catego.push('Without category');
        const reverseList = catego.reverse();
        setDropdownValue(reverseList[0]);
        setDropdownOptions(reverseList);
    }

    async function loadAccounts() {
        const accounts = await getAccountsWithoutCategory();
        setAccounts(accounts);
    }

    useEffect(() => {
        loadAccounts();
        loadCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submit = () => {
        const activeAccounts = accounts.filter(function (account) {
            return account.isActive === true;
        });

        const payload = {
            accounts: activeAccounts,
            message: message,
        };

        if (activeAccounts.length > 0 && message.length > 2) {
            postMessage(payload).then((r) => console.log(r));
        } else {
            console.log('No account or message');
        }
    };

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const onDropdownChange = async (value) => {
        if (value.label === 'Without category') {
            setAccounts(await getAccountsWithoutCategory());
        } else {
            const category = categories.find(
                (category) => category.label === value.label,
            );
            setCategory(category.id);
            setDropdownValue(value.value);
            setAccounts(await getAccountsByCategory(category.id));
        }
    };
    function findSurrogatePair(point) {
        const offset = point - 0x10000,
            lead = 0xd800 + (offset >> 10),
            trail = 0xdc00 + (offset & 0x3ff);
        return String.fromCharCode(lead) + String.fromCharCode(trail);
    }

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        const res = findSurrogatePair('0x' + emojiObject.unified);
        setMessage(message + res);
    };

    return (
        <div className={'posts-wrapper'}>
            <div className={'selection-wrapper'}>
                <DropdownField
                    placeholder={'Select a category'}
                    options={dropdownOptions}
                    onChange={onDropdownChange}
                    value={dropdownValue}
                />
            </div>
            <ul>
                <AccountCard
                    key={'123'}
                    accounts={accounts}
                    clickOnList={clickOnList}
                    setAccounts={setAccounts}
                />
            </ul>

            <div>
                {accounts.length > 0 && (
                    <form className={'post-form'}>
                        <div className="text-area-wrapper">
                            <textarea
                                id={'message'}
                                value={message}
                                onChange={handleChange}
                                placeholder={'Start Typin...'}
                            />
                            {/*<DatePicker*/}
                            {/*    selected={startDate}*/}
                            {/*    onChange={(date) => setStartDate(date)}*/}
                            {/*/>*/}
                            {/*<TimePicker onChange={onChange} value={value} />*/}
                            <TextAreaWidget onEmojiClick={onEmojiClick} />
                            <div>{message.length + '/250'}</div>
                        </div>
                        <Button
                            className={'large-square-blue'}
                            title={'Envoyer'}
                            submit={submit}
                        />
                    </form>
                )}
            </div>
        </div>
    );
};
