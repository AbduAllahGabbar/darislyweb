const crypto = require('crypto');

const apiKey = process.env.ZOOM_API_KEY;
const apiSecret = process.env.ZOOM_API_SECRET;

exports.generateSignature = async (meetingId) => {
    let role = 0;
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(apiKey + meetingId + timestamp + role).toString('base64')
    const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
    const signature = Buffer.from(`${apiKey}.${meetingId}.${timestamp}.${role}.${hash}`).toString('base64')
    return signature;
};
