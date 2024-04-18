const { apiRoot, projectKey } = require("./client.js");

module.exports.getCustomerById = (ID) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .withId({ ID })
    .get()
    .execute();
};

module.exports.getCustomerByKey = (key) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .withKey({ key })
    .get()
    .execute();
};

const createCustomerDraft = (customerData) => {
  const { email, password, firstName, lastName, countryCode, key } =
    customerData;

  return {
    email,
    password,
    key,
    firstName,
    lastName,
    addresses: [{ country: countryCode }],
    defaultBillingAddress: 0,
    defaultShippingAddress: 0,
  };
};

module.exports.createCustomer = (customerData) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .post({ body: createCustomerDraft(customerData) })
    .execute();
};

module.exports.createCustomerToken = (customer) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .emailToken()
    .post({
      body: {
        id: customer.body.id,
        ttlMinutes: 60,
        version: customer.body.version,
      },
    })
    .execute();
};

module.exports.confirmCustomerEmail = (token) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .emailConfirm()
    .post({
      body: {
        tokenValue: token.body.value,
      },
    })
    .execute();
};

module.exports.assignCustomerToCustomerGroup = (
  customerKey,
  customerGroupKey
) => {
  const updateActions = [
    {
      action: "setCustomerGroup",
      customerGroup: { key: customerGroupKey },
    },
  ];

  return this.getCustomerByKey(customerKey).then((customer) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID: customer.body.id })
      .post({
        body: {
          actions: updateActions,
          version: customer.body.version,
        },
      })
      .execute();
  });
};
