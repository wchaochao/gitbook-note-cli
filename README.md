# gitbook-note-cli

使用gitbook写笔记的cli工具，用于生成初始化文件

## 安装

```bash
# 全局安装
npm install -g https://github.com/wchaochao/gitbook-note-cli.git

# 本地安装
git clone https://github.com/wchaochao/gitbook-note-cli.git
cd gitbook-note-cli
npm link

# 初始化gitbook-note项目
cd <project-name-path>
gitbook-note init
```

## 创建gitbook笔记

* 在github上创建gitbook笔记库repo
* 设置webhook
* 下载repo到本地，使用gitbook-note-cli初始化
* 笔记中的图片存储在images库中
* 在gitbook-overview中添加链接
