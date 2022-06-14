---
date: 2022-05-30 20:27:00
description: docker和docker-compose是目前最流行的容器工具，今天我们来探索如何在deepin20.5系统上安装和使用。
tags:
  - docker
  - compose
  - deepin
---

import Callout from "nextra-theme-docs/callout";
import Authors, { Author } from 'components/authors'

# Deepin20.5 安装 docker 与 docker-compose

<Authors date="2022年5月30日 20时27分00秒">
    <Author name="terwer" link="https://github.com/terwer" />
</Authors>

<Callout emoji="💡">
文章更新历史<br/>
2022/06/14 fix:统信UOS 21.3家庭版验证通过。<br/>
2022/05/29 fix:Deepin 20.6验证通过。
</Callout>

## 卸载旧版本

```bash
sudo apt remove docker.io docker-engine
```

## 安装秘钥管理工具

```bash
sudo apt install software-properties-common
sudo apt install apt-transport-https ca-certificates curl
```

为了确认所下载软件包的合法性，需要添加软件源的 GPG 密钥。

```bash
// 中科大源
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/debian/gpg | sudo apt-key add -

// 官方源，能否成功可能需要看运气。
// curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
```

查看密钥是否安装成功

```bash
sudo apt-key fingerprint 0EBFCD88
```

## 添加 docker 源

~~方法一：直接修改文件（已废弃）~~

```bash
# 这里我们通过编辑 sudo vim /etc/apt/sources.list 添加一行即可，原因未知
# deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/debian buster stable
```

**方法二：新建镜像源文件（推荐）**

方法一是直接修改镜像原文件，显得不那么优雅。最好是在 `/etc/apt/sources.list.d` 目录新建一个 .list 文件，然后写上源地址即可。

```bash
cd /etc/apt/sources.list.d
sudo touch docker.list
```

内容如下：

```bash
deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/debian buster stable
```

![image-20220614204804619](https://ghproxy.com/https://raw.githubusercontent.com/terwer/upload/main/img/20220614205016.png)

## 安装 docker 以及 docker-compose

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-compose
```

## 让普通用户也可运行 docker

运行 `docker ps` 如果显示权限不足，那是是因为 docker 只允许 root 用户执行。为让普通用户也可运行 docker，执行

```bash
sudo usermod -aG docker username
```

将当前用户加入 docker 用户组，然后**注销用户重新登录**即可。

**注意：一定要注销登录、一定要注销登录、一定要注销登录。**

否则权限无法生效，普通用户使用 `docker ps` s无法查看 docker 状态。


## 启动 docker

```bash
systemctl start docker
```

## 测试安装效果

可以通过 `hello-world` 镜像来验证.

```bash
sudo docker run hello-world
docker ps
```

注意：如果不想重启，可以暂时使用sudo来看：

```bash
sudo docker ps
```

![image-20220614212007264](https://ghproxy.com/https://raw.githubusercontent.com/terwer/upload/main/img/20220614212009.png)



## 延伸阅读

### 查看可安装的所有版本列表

```bash
➜  ~ apt-cache madison docker-ce
 docker-ce | 5:20.10.16~3-0~debian-buster | https://mirrors.ustc.edu.cn/docker-ce/linux/debian buster/stable amd64 Packages
 docker-ce | 5:20.10.15~3-0~debian-buster | https://mirrors.ustc.edu.cn/docker-ce/linux/debian buster/stable amd64 Packages
 docker-ce | 5:20.10.14~3-0~debian-buster | https://mirrors.ustc.edu.cn/docker-ce/linux/debian buster/stable amd64 Packages
```

### 安装指定版本

```bash
$ sudo apt install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io docker-compose-plugin
```
### 禁止开机自启

默认情况下 docker 是开机自启的，如果我们想禁用开机自启，可以通过安装 chkconfig 命令来管理 Deepin 自启项：

1. 安装 chkconfig

   ```bash
   sudo apt install chkconfig
   ```

2. 移除自启

   ```bash
   sudo chkconfig --del docker
   ```