exports.btoa = (str) => Buffer.from(str).toString('base64');
exports.atob = (b64Encoded) => Buffer.from(b64Encoded, 'base64').toString();
