const { isNumber, isString, isBoolean, toObject } = require("./utils");

const modifyObjectValues = callback => source => {
  return Object.entries(source)
    .map(arr => callback(arr))
    .reduce(toObject, {});
};

const getObjectWithoutNumericKeys = source => {
  return Object.entries(source)
    .filter(arr => !isNumber(arr[0]))
    .reduce(toObject, {});
};

const reversBooleanValues = modifyObjectValues(([key, value]) => {
  const modifiedValue = isBoolean(value) ? !value : value;
  return [key, modifiedValue];
});

const toUpperCase = modifyObjectValues(([key, value]) => {
  const modifiedValue = isString(value) ? value.toUpperCase() : value;
  return [key, modifiedValue];
});

module.exports = {
  getObjectWithoutNumericKeys,
  reversBooleanValues,
  toUpperCase
};
