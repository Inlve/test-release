# Test-Release

测试语义化发布插件

## 使用步骤

### 配置 `CI` 服务

首先你需要有一个 `CI` 服务, 不管是 `travis` 还是 `jenkins` 或者是其他都可以.这里以 `travis` 为例, 参考 [`travis` 构建示例](https://docs.travis-ci.com/user/build-stages#examples)

### 安装

在本地 `Node` 项目中, 执行命令:

```shell
npm i --save-dev semantic-release
```

### 在 `CI` 服务中配 Git 身份验证

这里以 `travis` 为例, 具体其他 `CI` 可参考[CI Configuration](https://semantic-release.gitbook.io/semantic-release/usage/ci-configuration)

#### 生成 `ssh` 密钥

首先需要生成一个 `ssh` 密钥, 其中 `ssh_passphrase` 需要你自己填写一串有难度不容易被别人猜到的字符串, 需要记住, 后面还需要用到

```shell
ssh-keygen -t rsa -b 4096 -C "<your_email>" -f git_deploy_key -N "<ssh_passphrase>"
```

执行完成之后, 会在当前文件夹下生成 `git_deploy_key` 跟 `git_deploy_key.pub` 这两个文件

#### 将 `ssh` 公钥添加到 `git`

将 `ssh` 公钥(也就是 `git_deploy_key.pub` 文件的内容)添加到 `git`, 具体如何添加这里不细讲了, 可以参考其他文章. 在添加完成之后就可以删除 `git_deploy_key.pub` 文件了

#### 将私钥添加到 `CI` 服务上

在添加到 `CI` 服务上之前, 我们需要对私钥进行加密.

1. 首先, 你需要安装 `Ruby`.
2. 然后 安装 `travis`
   ```shell
   gem install travis
   ```
3. 登陆 `travis`
   ```shell
   travis login --com
   ```
4. 将前面步骤中使用到的 `ssh_passphrase`, 添加到 `travis` 环境变量
   ```shell
   travis env --com set SSH_PASSPHRASE <ssh_passphrase>
   ```
5. 加密密钥
   ```shell
   travis encrypt-file git_deploy_key
   ```
6. 配置 `.travis.yml` 将上一步中, 控制台的输出复制到 `.travis.yml`中的 `before_install`. 它看起来应该像 `openssl aes-256-cbc -K $encrypted_KKKKKKKKKKKK_key -iv $encrypted_VVVVVVVVVVVV_iv -in git_deploy_key.enc -out git_deploy_key -d`

   复制完成之后, 我们还需要修改输出路径: `-out git_deploy_key` => `/tmp/git_deploy_key`, 避免在 CI 上错误地提交/修改/删除未加密的密钥.

   ```yaml
   before_install:
     #解密git_deploy_key.enc钥匙进入/ tmp目录/ git_deploy_key
     - OpenSSL的AES-256-CBC -K $ encrypted_KKKKKKKKKKKK_key -IV $ encrypted_VVVVVVVVVVVV_iv -in git_deploy_key.enc退房手续的/ tmp / git_deploy_key -d
     #要保证在当前用户可读取私钥
     - chmod 600 /tmp/git_deploy_key
     #创建脚本将密码环境变量返回给 ssh-add
     - echo 'echo ${SSH_PASSPHRASE}' > /tmp/askpass && chmod +x /tmp/askpass
     #启动身份验证代理
     - eval "$(ssh-agent -s)"
     #将密钥添加到身份验证代理中
     -DISPLAY=":0.0" SSH_ASKPASS="/tmp/askpass" setid ssh-add /tmp/git_deploy_key </dev/null
   ```

7. 删除本地私钥
   ```shell
   rm git_deploy_key
   ```

### 配置语义化选项和插件

新建一个 `releaserc.js` 文件, 配置参考 [release-configuration](https://semantic-release.gitbook.io/semantic-release/usage/configuration#configuration)
