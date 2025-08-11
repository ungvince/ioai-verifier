export default (requirePath: string) => {
  const modulePath = require.resolve(requirePath);
  delete require.cache[modulePath];
  return require(requirePath);
};
