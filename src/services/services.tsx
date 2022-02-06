import axios from 'axios';
import {toast} from 'react-toastify';
import {privateHeader} from '../shared/tools/headers';

const BACK_END_URL = process.env.REACT_APP_API_URL;

export const connectSocial = (provider) => {
    const token = localStorage.getItem('TOKEN');
    return axios
        .get(BACK_END_URL + '/oauth/authorize/' + provider, {
            headers: privateHeader(token),
        })
        .then((res) => {
            window.location.href = res.data.content;
        });
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
                navigate('/');
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
                navigate('/');
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
                navigate('/');
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
                navigate('/');
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
                navigate('/');
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
                navigate('/');
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
                navigate('/');
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
                navigate('/');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};

export const getUserInfos = () => {
    const token = localStorage.getItem('TOKEN');

    return axios.get(BACK_END_URL + '/user/settings', {
        headers: privateHeader(token),
    });
};

export const PostMessage = (navigate, payload) => {
    const token = localStorage.getItem('TOKEN');

    return axios.post(BACK_END_URL + '/batch', payload, {
        headers: privateHeader(token),
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
                navigate('/');
            }

            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return error;
        });
};

export const errorsHandlersGET = (axiosResponse, navigate) => {
    return axiosResponse
        .then(function (response) {
            return response['data']['content'];
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                navigate('/');
            }
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
            });
        });
};
