---
date: 2022-06-13 23:22:24
description: 在JS中，创建的时间有时候会默认带有T和Z，不利于显示，可以使用这个方法去除。
---

# JS去除日期date格式化中的T和Z

代码如下

```javascript
const formatDate = (dt) => {
  if (!dt) {
    return "";
  }
  let newdt = dt.replace(/T/g, ' ')
  return newdt.substr(0, newdt.lastIndexOf('.'));
}
```