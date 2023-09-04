export function  arrGroup(arr, fn) {
  const obj = {};
  arr.forEach(item => {
    const key = JSON.stringify(fn(item));
    obj[key] = obj[key] || [];
    obj[key].push(item)
  });
  return Object.keys(obj).map(k => {
    return obj[k];
  })
}
