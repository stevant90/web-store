import axios from 'axios';

import { BASE_URL } from '../apiInfo';

export const fetchData = (type, successHandler, errorHandler) => {
    const url = `${BASE_URL}${type}`;

    return axios.get(url)
        .then(response => successHandler(response.data))
        .catch(error => errorHandler(error));
}