import fetch from './fetch';

export const getUsers = async (page) => {

    return await fetch.get(`/ms/table/lis?page=${page}`);
}