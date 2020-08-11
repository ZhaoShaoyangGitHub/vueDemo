/*
 * 判断是否有该类名
 */
export const hasClass = (el, className) => {
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
  return reg.test(el.className);
};
/*
 * 添加类名
 */
export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(" ");
  newClass.push(className);
  el.className = newClass.join(" ");
};
/*
 * 删除类名
 */
export const removeClass = (el, className) => {
  if (!hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(" ");
  for (let [index, elem] of newClass.entries()) {
    if (elem === className) {
      newClass.splice(index, 1);
    }
  }
  el.className = newClass.join(" ");
};
