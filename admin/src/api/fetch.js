import axios from 'axios';

const headers = () => {

    return {
        'Authorization': localStorage.getItem('token') || ''
    }
}
export const getFetch = url => {

    try {
        let a = axios.get(url, {
            headers: headers()
        });

        console.log(a, b)
    } catch (e) {
        console.log(err);
    }
}

export const postFetch = (url, data) => {

    return axios.post(url, data, { headers: headers() });
}