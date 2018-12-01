const toObject = (acc, [key, value]) => {
  acc[key] = value;
  return acc;
};

const isNumber = value => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

const checkType = type => value => {
  return typeof value === type;
};

const isBoolean = checkType("boolean");
const isString = checkType("string");

module.exports = {
  toObject,
  isNumber,
  isBoolean,
  isString
};
