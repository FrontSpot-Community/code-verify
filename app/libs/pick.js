export default (object, paths) => {
  return paths.reduce((acc, path) => {
    acc[path] = object[path];
    return acc;
  }, {});
};
