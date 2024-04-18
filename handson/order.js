const { apiRoot, projectKey } = require("./client.js");
const { getCustomerByKey } = require("./customer.js");

module.exports.createCart = async (customerKey) => {
  return getCustomerByKey(customerKey).then((customer) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .post({
        body: {
          currency: "EUR",
          country: "DE",
          customerId: customer.body.id,
          customerEmail: customer.body.email,
          shippingAddress: customer.body.addresses.find(
            (address) => address.id == customer.body.defaultShippingAddressId
          ),
          inventoryMode: "ReserveOnOrder",
          deleteDaysAfterLastModification: 90,
        },
      })
      .execute();
  });
};

module.exports.createAnonymousCart = () =>
  apiRoot
    .withProjectKey({ projectKey })
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
      },
    })
    .execute();

module.exports.customerSignIn = (customerDetails) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .login()
    .post({ body: customerDetails })
    .execute();
};

module.exports.getCartById = (ID) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .carts()
    .withId({ ID })
    .get()
    .execute();
};

module.exports.addLineItemsToCart = async (cartId, arrayOfSKUs) => {
  return this.getCartById(cartId).then((cart) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.body.version,
          actions: arrayOfSKUs.map((sku) => {
            return {
              action: "addLineItem",
              sku,
            };
          }),
        },
      })
      .execute();
  });
};

module.exports.addDiscountCodeToCart = async (cartId, discountCode) => {
  return this.getCartById(cartId).then((cart) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          actions: [
            {
              action: "addDiscountCode",
              code: discountCode,
            },
          ],
          version: cart.body.version,
        },
      })
      .execute();
  });
};

module.exports.createOrderFromCart = async (cartId) => {
  return createOrderFromCartDraft(cartId).then((orderFromCartDraft) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .post({
        body: orderFromCartDraft,
      })
      .execute();
  });
};

const createOrderFromCartDraft = async (cartId) => {
  return this.getCartById(cartId).then((cart) => {
    return {
      id: cart.body.id,
      version: cart.body.version,
    };
  });
};

module.exports.getOrderById = (ID) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .orders()
    .withId({ ID })
    .get()
    .execute();
};

module.exports.updateOrderCustomState = async (orderId, customStateKey) => {
  return this.getOrderById(orderId).then((order) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .withId({
        ID: orderId,
      })
      .post({
        body: {
          actions: [
            {
              action: "transitionState",
              state: {
                typeId: "state",
                key: customStateKey,
              },
            },
          ],
          version: order.body.version,
        },
      })
      .execute();
  });
};

module.exports.createPayment = (paymentDraft) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .payments()
    .post({ body: paymentDraft })
    .execute();
};

module.exports.setOrderState = async (orderId, stateName) => {
  return this.getOrderById(orderId).then((order) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [
            {
              action: "changeOrderState",
              orderState: stateName,
            },
          ],
        },
      })
      .execute();
  });
};

module.exports.addPaymentToOrder = async (orderId, paymentId) => {
  return this.getOrderById(orderId).then((order) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [
            {
              action: "addPayment",
              payment: {
                typeId: "payment",
                id: paymentId,
              },
            },
          ],
        },
      })
      .execute();
  });
};
