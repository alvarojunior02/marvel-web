import md5 from 'md5';

export const baseURL = 'https://gateway.marvel.com/v1/public';

export const publicKey = '4412a6d9c05caa9dd37426dc666ad79c';

const privateKey = 'c6ce91499ece9270e6e9044a3f2ba1845f6aee97';

export const timestamp = Number(new Date());

export const hash = md5(timestamp + privateKey + publicKey);