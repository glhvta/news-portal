const { getOptions, interpolateName } = require("loader-utils");
const {
  reversBooleanValues,
  toUpperCase,
  getObjectWithoutNumericKeys
} = require("./transformers");

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

  const modifications = [
    [reversBooleanValues, reversBoolean],
    [toUpperCase, stringToUpperCase],
    [getObjectWithoutNumericKeys, true]
  ];

  const path = interpolateName(this, output, options);

  const modifiedSource = modifySource(modifications, JSON.parse(source));
  const stringifedModifiedSource = JSON.stringify(modifiedSource);

  this.emitFile(path, stringifedModifiedSource);

  return `export default ${stringifedModifiedSource}`;
};
