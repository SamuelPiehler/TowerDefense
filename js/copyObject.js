function copyObj(obj) {
  if (typeof(obj) == 'object' && !Array.isArray(obj)) {
    var newObj = {};
    for (var item in obj) {
      if (typeof(obj[item]) == "object") {
        newObj[item] = copyObj(obj[item]);
      }
      else {
        newObj[item] = obj[item];
      }
    }
  }
  else if (Array.isArray(obj)) {
    var newObj = [];
    obj.forEach((item, i) => {
      if (typeof(item) == "object") {
        newObj[i] = copyObj(item);
      }
      else {
        newObj[i] = item;
      }
    });
  }
  else {
    newObj = obj;
  }
  return newObj;
}
