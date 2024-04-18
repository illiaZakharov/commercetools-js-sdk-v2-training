const checkout = require("./handson/order");
const { log } = require("./logger.js");

const customerKey = "illia999";
const cartId = "138c1321-95da-4d9c-8f40-1969b9d09300";
const orderId = "c7f5e5d3-50a7-436e-9da3-b0615aaa1efb";

const paymentDraft = {
  key: "payment" + Math.random().toString(36).substr(2, 5),
  amountPlanned: {
    currencyCode: "EUR",
    centAmount: 5000,
  },
};

// create a cart and update the catId variable
// checkout.createCart(customerKey).then(log).catch(log);

// checkout
//   .addLineItemsToCart(cartId, ["RCQB-01", "TARM-034"])
//   .then(log)
//   .catch(log);

// checkout.addDiscountCodeToCart(cartId, "SUMMER").then(log).catch(log);
// checkout.getCartById(cartId).then(log).catch(log);

// create order from cart and update the orderId
// checkout.createOrderFromCart(cartId).then(log).catch(log);

// checkout.getOrderById(orderId).then(log).catch(log);

// set order state to confirmed and custom workflow state to order packed
// checkout.setOrderState(orderId, "Confirmed").then(log).catch(log);
// checkout
//   .updateOrderCustomState(orderId, "zi-order-packed")
//   .then(log)
//   .catch(log);

const checkoutProcess = async () => {
  let emptyCart = await checkout.createCart(customerKey);

  let filledCart = await checkout.addLineItemsToCart(emptyCart.body.id, [
    "RCQB-01",
    "TARM-034",
  ]);
  filledCart = await checkout.addDiscountCodeToCart(
    emptyCart.body.id,
    "TEST-18"
  );

  let order = await checkout.createOrderFromCart(filledCart.body.id);
  const payment = await checkout.createPayment(paymentDraft);
  order = await checkout.addPaymentToOrder(order.body.id, payment.body.id);
  order = await checkout.setOrderState(order.body.id, "Confirmed");
  order = await checkout.updateOrderCustomState(
    order.body.id,
    "zi-order-packed"
  );
  if (order) {
    return {
      status: 201,
      message: "order created: " + order.body.id,
    };
  }
};

checkoutProcess().then(log).catch(log);
