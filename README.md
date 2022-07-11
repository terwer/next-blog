# next-blog

my next blog using nextra, inspired by https://github.com/vercel/swr-site, visit: [https://note.terwergreen.com](https://note.terwergreen.com)

To develop it locally, clone this repository and run the following command to start the local dev server:

```bash
pnpm install
pnpm dev
```

And visit `localhost:3000` to preview your changes.

## deploy

```
yarn p
```

## sync

同步所有平台

```
cd bsync
python3 sync.py -p=all
```

同步单个平台

```
python3 sync.py -p=conf
python3 sync.py -p=wp
python3 sync.py -p=github
python3 sync.py -p=cnblogs
python3 sync.py -p=csdn
python3 sync.py -p=jianshu
python3 sync.py -p=wechat
python3 sync.py -p=yuque
python3 sync.py -p=evalnote
```

查看支持的平台

```
python3 sync.py -h
```

## TODO

1、暂时不支持博客分页。

2、暂时不支持标签