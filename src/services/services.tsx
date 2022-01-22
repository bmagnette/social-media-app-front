import axios from 'axios';
import {toast} from 'react-toastify';
import {privateHeader} from '../shared/tools/headers';
import history from '../shared/history';

const BACK_END_URL = process.env.REACT_APP_BACK_END;

export const connectLinkedIn = () => {
    const token = localStorage.getItem('TOKEN');
    return axios
        .post(BACK_END_URL + '/linkedin/authorize', privateHeader(token), {})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const connectFacebookAccount = () => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .post(
            BACK_END_URL + '/linkedin/facebook-authorize',
            privateHeader(token),
            {},
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const connectTwitterAccount = () => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .post(
            BACK_END_URL + '/linkedin/twitter-authorize',
            privateHeader(token),
            {},
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const getAccounts = () => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .get(BACK_END_URL + '/accounts', {
            headers: privateHeader(token),
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const closeAccount = (_id) => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .delete(BACK_END_URL + '/account/' + _id, {
            headers: privateHeader(token),
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const closeCategory = (_id) => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .delete(BACK_END_URL + '/category/' + _id, {
            headers: privateHeader(token),
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};
export const getCategories = () => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .get(BACK_END_URL + '/categories', {
            headers: privateHeader(token),
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const getCategory = (_id) => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .get(BACK_END_URL + '/category/' + _id, {
            headers: privateHeader(token),
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const editCategory = (_id, payload) => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .put(BACK_END_URL + '/category/' + _id, payload, {
            headers: privateHeader(token),
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const addCategory = (payload) => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .post(BACK_END_URL + '/category', payload, {
            headers: privateHeader(token),
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const getAccountsWithoutCategory = () => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .get(BACK_END_URL + '/accounts/orphan', {
            headers: privateHeader(token),
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const getAccountsByCategory = (_id) => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .get(BACK_END_URL + '/category/' + _id + '/accounts', {
            headers: privateHeader(token),
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const getPostBatch = () => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .get(BACK_END_URL + '/batchs', {
            headers: privateHeader(token),
        })
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const postMessage = (payload) => {
    const token = localStorage.getItem('TOKEN');

    return axios
        .post(BACK_END_URL + '/batch', privateHeader(token), payload)
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
            if (error.response.status === 401) {
                history.push('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const registerUser = (payload) => {
    return axios.post(BACK_END_URL + '/register/user', payload);
};

export const loginApplication = (payload) => {
    return axios.post(BACK_END_URL + '/login', payload);
};
