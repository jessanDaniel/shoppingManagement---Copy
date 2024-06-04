export default (order = [], action) => {
  switch (action.type) {
    case "ORDER_SUMMARY":
      return action.payload;
    default:
      return order;
  }
};
