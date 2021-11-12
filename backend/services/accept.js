const axios = require("axios");
const _ = require("lodash");
const crypto = require("crypto");

exports.getAuthToken = async () =>
  await axios.post(
    "https://accept.paymobsolutions.com/api/auth/tokens",
    {
      api_key: process.env.ACCEPT_API_KEY,
    },
    { headers: { "Content-Type": "application/json" } }
  );

exports.registerOrder = async (token, amount) =>
  await axios.post(
    "https://accept.paymobsolutions.com/api/ecommerce/orders",
    {
      auth_token: token,
      amount_cents: amount,
      currency: "EGP",
    },
    { headers: { "Content-Type": "application/json" } }
  );

exports.getPaymentKey = async (token, amount, orderId, billingInfo) =>
  await axios.post(
    "https://accept.paymobsolutions.com/api/acceptance/payment_keys",
    {
      auth_token: token,
      integration_id: process.env.ACCEPT_INTEGRATION_ID,
      order_id: orderId,
      amount_cents: amount,
      currency: "EGP",
      billing_data: {
        apartment: "NA",
        email: billingInfo.email,
        floor: "NA",
        first_name: billingInfo.firstName,
        street: "NA",
        building: "NA",
        phone_number: billingInfo.phone,
        shipping_method: "NA",
        postal_code: "NA",
        city: "NA",
        country: "NA",
        last_name: billingInfo.lastName,
        state: "NA",
      },
    },
    { headers: { "Content-Type": "application/json" } }
  );

exports.getPaymentKeyWithCardToken = async (
  token,
  amount,
  orderId,
  billingInfo,
  cardToken
) =>
  await axios.post(
    "https://accept.paymobsolutions.com/api/acceptance/payment_keys",
    {
      auth_token: token,
      integration_id: process.env.ACCEPT_INTEGRATION_ID,
      order_id: orderId,
      amount_cents: amount,
      currency: "EGP",
      token: cardToken,
      billing_data: {
        apartment: "NA",
        email: billingInfo.email,
        floor: "NA",
        first_name: billingInfo.firstName,
        street: "NA",
        building: "NA",
        phone_number: billingInfo.phone,
        shipping_method: "NA",
        postal_code: "NA",
        city: "NA",
        country: "NA",
        last_name: billingInfo.lastName,
        state: "NA",
      },
    },
    { headers: { "Content-Type": "application/json" } }
  );

const calculateConcatStringTransactionCallback = (response) => {
  const fields = [
    "amount_cents",
    "created_at",
    "currency",
    "error_occured",
    "has_parent_transaction",
    "id",
    "integration_id",
    "is_3d_secure",
    "is_auth",
    "is_capture",
    "is_refunded",
    "is_standalone_payment",
    "is_voided",
  ];
  let values;

  const responseObj =
    response.method == "POST" ? response.body : response.query;

  if (responseObj.obj) {
    values = [
      ...orderedValues(fields, responseObj.obj),
      responseObj.obj.order.id,
      responseObj.obj.owner,
      responseObj.obj.pending,
      responseObj.obj.source_data.pan,
      responseObj.obj.source_data.sub_type,
      responseObj.obj.source_data.type,
      responseObj.obj.success,
    ];
  } else {
    values = [
      ...orderedValues(fields, responseObj),
      responseObj.order,
      responseObj.owner,
      responseObj.pending,
      responseObj["source_data.pan"],
      responseObj["source_data.sub_type"],
      responseObj["source_data.type"],
      responseObj.success,
    ];
  }
  return values.join("");
};

const calculateConcatStringCardTokenCallback = (response) => {
  const responseObj = response.body;
  const fields = [
    "card_subtype",
    "created_at",
    "email",
    "id",
    "masked_pan",
    "merchant_id",
    "order_id",
    "token",
  ];
  const values = orderedValues(fields, responseObj.obj);
  return values.join("");
};

const orderedValues = (keys, obj) => {
  var arrResult = [];
  for (var i = 0; i < keys.length; i++) arrResult[i] = obj[keys[i]];
  return arrResult;
};

exports.checkHMAC = (response) => {
  const concatString =
    response.body && response.body.type == "TOKEN"
      ? calculateConcatStringCardTokenCallback(response)
      : calculateConcatStringTransactionCallback(response);

  const hmac = crypto.createHmac("sha512", process.env.ACCEPT_HMAC_SECRET);
  const acceptHmac = response.query.hmac;
  const expectedHmac = hmac.update(concatString).digest("hex");

  return expectedHmac == acceptHmac;
};
