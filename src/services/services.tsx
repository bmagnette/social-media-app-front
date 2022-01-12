import axios from 'axios';

const BACK_END_URL = 'http://localhost:5000';

const HEADER = {'Access-Control-Allow-Origin': '*'};

export const connectLinkedIn = () => {
    return axios
        .post(BACK_END_URL + '/linkedin/authorize', HEADER, {})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const connectFacebookAccount = () => {
    return axios
        .post(BACK_END_URL + '/linkedin/facebook-authorize', HEADER, {})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const connectTwitterAccount = () => {
    return axios
        .post(BACK_END_URL + '/linkedin/twitter-authorize', HEADER, {})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const getAccounts = () => {
    return axios
        .get(BACK_END_URL + '/accounts', {
            headers: HEADER,
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const closeAccount = (_id) => {
    return axios
        .delete(BACK_END_URL + '/account/' + _id, {
            headers: HEADER,
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const closeCategory = (_id) => {
    return axios
        .delete(BACK_END_URL + '/category/' + _id, {
            headers: HEADER,
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            console.log(error);
        });
};
export const getCategories = () => {
    return axios
        .get(BACK_END_URL + '/categories', {
            headers: HEADER,
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const getCategory = (_id) => {
    return axios
        .get(BACK_END_URL + '/category/' + _id, {
            headers: HEADER,
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const editCategory = (_id, payload) => {
    return axios
        .put(BACK_END_URL + '/category/' + _id, payload, {
            headers: HEADER,
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const addCategory = (payload) => {
    return axios
        .post(BACK_END_URL + '/category', payload, {
            headers: HEADER,
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const getAccountsWithoutCategory = () => {
    return axios
        .get(BACK_END_URL + '/accounts/orphan', {
            headers: HEADER,
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const getAccountsByCategory = (_id) => {
    return axios
        .get(BACK_END_URL + '/category/' + _id + '/accounts', {
            headers: HEADER,
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const postMessage = (payload) => {
    return axios
        .post(BACK_END_URL + '/batch', payload)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};
