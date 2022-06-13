#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

msg='auto deploy next blog to github'
srcgithubUrl=git@github.com:terwer/next-blog.git

git config user.name "terwer"
git config user.email "youweics@163.com"
git add -A
git commit -m "${msg}"
git push $srcgithubUrl develop:develop # 推送到github main分支
echo "next blog deploy finished."
