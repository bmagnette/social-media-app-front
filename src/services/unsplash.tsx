import axios from 'axios';
import {privateHeader} from '../shared/tools/headers';
import {toast} from 'react-toastify';

const BACK_END_URL = process.env.REACT_APP_API_URL;

export const queryUnSplash = (navigate, query) => {
    const token = localStorage.getItem('TOKEN');
    return axios
        .get(BACK_END_URL + '/unsplash/' + query, {
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
