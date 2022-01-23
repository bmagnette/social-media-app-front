import axios from 'axios';
import {toast} from 'react-toastify';
import {privateHeader} from '../shared/tools/headers';
import {useNavigate} from 'react-router-dom';

const BACK_END_URL = process.env.REACT_APP_API_URL;

export const ConnectLinkedIn = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('TOKEN');
    return axios
        .post(BACK_END_URL + '/linkedin/authorize', privateHeader(token), {})
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

export const ConnectFacebookAccount = () => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

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

export const ConnectTwitterAccount = () => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

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

export const GetAccounts = () => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

    return axios
        .get(BACK_END_URL + '/accounts', {
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

export const CloseAccount = (_id) => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

    return axios
        .delete(BACK_END_URL + '/account/' + _id, {
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

export const CloseCategory = (_id) => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

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
export const GetCategories = () => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

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

export const GetCategory = (_id) => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

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

export const EditCategory = (_id, payload) => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

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

export const AddCategory = (payload) => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

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

export const GetAccountsWithoutCategory = () => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

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

export const GetAccountsByCategory = (_id) => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

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

export const GetPostBatch = () => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

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

export const PostMessage = (payload) => {
    const token = localStorage.getItem('TOKEN');
    const navigate = useNavigate();

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
