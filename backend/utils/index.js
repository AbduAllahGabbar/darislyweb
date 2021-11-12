exports.generateUniqueId = (size = 4) => {
  let s4 = () => {
    return Math.floor((1 + Math.random() * Date.now()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  let id = "";
  for (var i = 0; i < size; i++) id += s4();
  return id;
};
