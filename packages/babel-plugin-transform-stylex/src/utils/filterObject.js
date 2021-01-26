module.exports = function filterObject(obj, keys) {
  const newObj = {};

  // Iterate in existing order
  for (const key in obj) {
    if (keys.includes(key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};
