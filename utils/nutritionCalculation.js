export const calculateCarbs = (items) => {
  let totalCarbs = 0;
  if (items.length > 0) {
    items.map((x) => {
      let carbs = x.foodNutrients.find((y) => {
        return y.number == 205;
      });
      let itemCarbs = carbs.amount * x.count;
      totalCarbs = totalCarbs + itemCarbs;
    });
  }
  return totalCarbs;
};
