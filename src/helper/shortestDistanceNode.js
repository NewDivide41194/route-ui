export const shortestValue = (obj) => {
  console.log(obj);
  var [lowestItems] = Object.entries(obj).sort(([, v1], [, v2]) => v1 - v2);
  return lowestItems[0];
};
