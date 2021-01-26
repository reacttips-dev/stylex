/**
 * Resolve the value of a node path.
 */
module.exports = function resolvePathValue(path) {
  const {value, confident, deopt} = path.evaluate();
  if (confident) {return value;}
  throw deopt.buildCodeFrameError('Could not evaluate value');
};
