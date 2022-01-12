export const clickOnList = (_id, accounts, setAccounts) => {
    const newAccounts = accounts.map((account) => {
        if (account.id === _id) {
            if (account.hasOwnProperty('isActive')) {
                account['isActive'] = !account['isActive'];
            } else {
                account['isActive'] = true;
            }
        }
        return account;
    });
    setAccounts(newAccounts);
};
