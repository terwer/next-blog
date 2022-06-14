---
date: 2022-06-14 14:31:20
description: 使用nodejs实现ed25519的公钥加密和私钥解密。
---

主要使用了crypto库

加解密和验证代码

```javascript
const crypto = require('crypto');

const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');

const message = 'Hello world!';
console.log(message);

const signature = crypto.sign(null, Buffer.from(message), privateKey);
console.log(signature);

const verified = crypto.verify(null, Buffer.from(message), publicKey, signature)
console.log('Match:', verified);
```

