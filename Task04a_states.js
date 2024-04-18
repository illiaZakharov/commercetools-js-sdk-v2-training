const states = require("./handson/states");
const { log } = require("./logger.js");

const orderPackedStateDraft = {
  key: "zi-order-packed",
  type: "OrderState",
  name: {
    de: "ZI Order Packed ",
    en: "ZI Order Packed ",
  },
  initial: true,
};

const orderCompletedStateDraft = {
  key: "zi-order-completed",
  type: "OrderState",
  name: {
    de: "ZI Order Completed ",
    en: "ZI Order Completed ",
  },
  initial: false,
};

const createStatesWithTransitions = async () => {
  let orderPackedState = await states.createNewState(orderPackedStateDraft);
  let orderCompletedState = await states.createNewState(
    orderCompletedStateDraft
  );

  orderPackedState = states.addTransition(orderPackedState.body.id, [
    orderCompletedState.body.id,
  ]);

  orderCompletedState = states.addTransition(orderCompletedState.body.id, []);

  return orderPackedState;
};

// createStatesWithTransitions().then(log).catch(log);

states.getStateByKey(orderPackedStateDraft.key).then(log).catch(log);
