let ImageKit = require('imagekit');

const {
IMAGEKIT_PUBLIC_KEY="public_qVKw5R8qrKzauiiYGHBOC2+D6SY=",

IMAGEKIT_PRIVATE_KEY="private_cbBkLingxuS5jt23SPvPIyLYaGw=",

IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/3cqkxz6ek/"
} = process.env;

module.exports = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT
});