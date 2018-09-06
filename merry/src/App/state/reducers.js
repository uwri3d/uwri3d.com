const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return {
        ...state,
        ...payload,
      };
  }
};

export default reducer;
