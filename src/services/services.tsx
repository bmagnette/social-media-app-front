import axios from 'axios';
import {toast} from 'react-toastify';
import {privateHeader} from '../shared/tools/headers';

const BACK_END_URL = process.env.REACT_APP_API_URL;

export const ConnectLinkedIn = () => {
    const token = localStorage.getItem('TOKEN');
    return axios.post(
        BACK_END_URL + '/linkedin/authorize',
        {},
        {
            headers: privateHeader(token),
        },
    );
};

export const ConnectFacebookAccount = () => {
    const token = localStorage.getItem('TOKEN');
    return axios.post(
        BACK_END_URL + '/linkedin/facebook-authorize',
        {},
        {
            headers: privateHeader(token),
        },
    );
};

export const ConnectTwitterAccount = () => {
    const token = localStorage.getItem('TOKEN');
    return axios.post(
        BACK_END_URL + '/linkedin/twitter-authorize',
        {},
        {
            headers: privateHeader(token),
        },
    );
};

export const CloseAccount = (navigate, _id) => {
    const token = localStorage.getItem('TOKEN');

    return axios.delete(BACK_END_URL + '/account/' + _id, {
        headers: privateHeader(token),
    });
};

export const createAccount = (payload) => {
    const token = localStorage.getItem('TOKEN');
    return axios.post(BACK_END_URL + '/account', payload, {
        headers: privateHeader(token),
    });
};

export const CloseCategory = (navigate, _id) => {
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
                navigate('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};
export const GetCategories = (navigate) => {
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
                navigate('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const GetCategory = (navigate, _id) => {
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
                navigate('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const EditCategory = (navigate, _id, payload) => {
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
                navigate('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const AddCategory = (navigate, payload) => {
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
                navigate('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const GetAccountsWithoutCategory = (navigate) => {
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
                navigate('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const GetAccountsByCategory = (navigate, _id) => {
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
                navigate('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const GetPostBatch = (navigate) => {
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
                navigate('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const getPrice = () => {
    const token = localStorage.getItem('TOKEN');

    return axios.get(BACK_END_URL + '/user/price', {
        headers: privateHeader(token),
    });
};

export const getAccountsNumber = () => {
    const token = localStorage.getItem('TOKEN');

    return axios.get(BACK_END_URL + '/user/accounts', {
        headers: privateHeader(token),
    });
};

export const getEndFreeTrial = () => {
    const token = localStorage.getItem('TOKEN');

    return axios.get(BACK_END_URL + '/user/end_free_trial', {
        headers: privateHeader(token),
    });
};

export const PostMessage = (navigate, payload) => {
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
                navigate('/login');
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

export const errorsHandlers = (axiosResponse, navigate) => {
    return axiosResponse
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                navigate('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const errorsHandlersGET = (axiosResponse, navigate) => {
    return axiosResponse
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                navigate('/login');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};
