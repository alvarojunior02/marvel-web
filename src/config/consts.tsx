import md5 from 'md5';

export const baseURL = 'https://gateway.marvel.com:443/v1/public';

export const publicKey = '4f9f2c907cddd16cc0bb83db5b39b877';

const privateKey = '652c4576cf2d84c19bdbd88bc231dbe8858d7230';

export const timestamp = Number(new Date());

export const hash = md5(timestamp + privateKey + publicKey);