const { getOptions, interpolateName } = require("loader-utils");

const isNumber = value => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

const checkType = type => value => {
  return typeof value === type;
};

const isBoolean = checkType("boolean");
const isString = checkType("string");

const toObject = (acc, [key, value]) => {
  acc[key] = value;
  return acc;
};

const getObjectWithoutNumericKeys = source => {
  return Object.entries(source)
    .filter(arr => !isNumber(arr[0]))
    .reduce(toObject, {});
};

const reversBooleanValues = ([key, value]) => {
  const modifiedValue = isBoolean(value) ? !value : value;
  return [key, modifiedValue];
};

const toUpperCase = ([key, value]) => {
  const modifiedValue = isString(value) ? value.toUpperCase() : value;
  return [key, modifiedValue];
};

const modifyObjectValues = callback => source => {
  return Object.entries(source)
    .map(arr => callback(arr))
    .reduce(toObject, {});
};

const modifySource = (modifications, source) => {
  return modifications.reduceRight((acc, [func, predicate]) => {
    return predicate ? func(acc) : acc;
  }, source);
};

module.exports = function(source) {
  const options = getOptions(this) || {};
  const {
    output = "./jsonFiles/[name].json",
    reversBoolean,
    stringToUpperCase
  } = options;

  const path = interpolateName(this, output, options);

  const modifications = [
    [modifyObjectValues(reversBooleanValues), reversBoolean],
    [modifyObjectValues(toUpperCase), stringToUpperCase],
    [getObjectWithoutNumericKeys, true]
  ];

  const modifiedSource = modifySource(modifications, JSON.parse(source));
  const stringifedModifiedSource = JSON.stringify(modifiedSource);

  this.emitFile(path, stringifedModifiedSource);

  return `export default ${stringifedModifiedSource}`;
};
