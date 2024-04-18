const { apiRoot, projectKey } = require("./handson/client.js");
const { log } = require("./logger.js");

// TODO 1: Complete the functions in
// ./handson/client.js

// TODO : GET project details
// So this code displays the project configuration
// https://docs.commercetools.com/http-api-projects-project.html#get-project

apiRoot.withProjectKey({ projectKey }).get().execute().then(log).catch(log);

// TODO : GET ShippingMethod by ID

const ID = "";

apiRoot
  .withProjectKey({ projectKey })
  .shippingMethods()
  .withId({ ID })
  .get()
  .execute()
  .then(log)
  .catch(log);

// TODO : GET Tax Category by key

const KEY = "";

apiRoot
  .withProjectKey({ projectKey })
  .taxCategories()
  .withKey({ key: KEY })
  .get()
  .execute()
  .then(log)
  .catch(log);
