export const privateHeader = (token) => {
    return {
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };
};
