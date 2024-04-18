const {
  createCustomer,
  getCustomerById,
  getCustomerByKey,
  createCustomerToken,
  confirmCustomerEmail,
  assignCustomerToCustomerGroup,
} = require("./handson/customer");
const { log } = require("./logger.js");

const customerDraftData = {
  firstName: "Illia",
  lastName: "Zakharov",
  email: "illia_zakharov@test.com",
  password: "Password@123",
  key: "illia999",
  countryCode: "DE",
};

// createCustomer(customerDraftData).then(log).catch(log);

// getCustomerByKey("illia999").then(log).catch(log);

// getCustomerById("a303f0e7-8535-4784-a638-e59f05208355").then(log).catch(log);

// getCustomerByKey('illia999')
//   .then(createCustomerToken)
//   .then(confirmCustomerEmail)
//   .then(log)
//   .catch(log);

assignCustomerToCustomerGroup("illia999", "se-cg-epamer").then(log).catch(log);
