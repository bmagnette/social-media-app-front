import axios from 'axios';
import {toast} from 'react-toastify';

const BACK_END_URL = process.env.REACT_APP_BACK_END;
const HEADER = {'Access-Control-Allow-Origin': '*'};
console.log(BACK_END_URL);
export const connectLinkedIn = () => {
    return axios
        .post(BACK_END_URL + '/linkedin/authorize', HEADER, {})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const connectFacebookAccount = () => {
    return axios
        .post(BACK_END_URL + '/linkedin/facebook-authorize', HEADER, {})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const connectTwitterAccount = () => {
    return axios
        .post(BACK_END_URL + '/linkedin/twitter-authorize', HEADER, {})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
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
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
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
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
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
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
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
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
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
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
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
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
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
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
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
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
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
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const getPostBatch = () => {
    return axios
        .get(BACK_END_URL + '/batchs', {
            headers: HEADER,
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const postMessage = (payload) => {
    return axios
        .post(BACK_END_URL + '/batch', payload)
        .then(function (response) {
            console.log(response);
            toast.info('Message sent !', {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        })
        .catch(function (error) {
            toast.error(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};
