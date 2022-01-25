import axios from 'axios';
import {privateHeader} from '../shared/tools/headers';

const BACK_END_URL = process.env.REACT_APP_API_URL;

export const createCustomer = (payload) => {
    const token = localStorage.getItem('TOKEN');
    return axios.post(BACK_END_URL + '/stripe/customer', payload, {
        headers: privateHeader(token),
    });
};
