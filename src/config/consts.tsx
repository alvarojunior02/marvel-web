import md5 from 'md5';

export const baseURL = 'https://gateway.marvel.com/v1/public';

export const publicKey = 'eba5f7229d518f1793b9ae6fe845d929';

const privateKey = '99e2dc47f404beb790983c39e19239c497a829a1';

export const timestamp = Number(new Date());

export const hash = md5(timestamp + privateKey + publicKey);