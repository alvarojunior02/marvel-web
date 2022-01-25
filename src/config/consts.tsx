import md5 from 'md5';

export const baseURL = 'https://gateway.marvel.com:443/v1/public';

export const publicKey = '1ca2137b5825144c3f544081d06fa72e';

const privateKey = 'ff91b41b35a8f8a6c601bb19f83e9cfb82cac10c';

export const timestamp = Number(new Date());

export const hash = md5(timestamp + privateKey + publicKey);