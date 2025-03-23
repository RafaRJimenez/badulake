export const selectPages = (state) => {
    const total = state.products.products.total;
    return total > 0 ? Math.ceil(total / 12) : 0;
  };