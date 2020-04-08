#!/bin/bash

# 在package.json中的script字段中，添加对应指令
# script: {
#     'deploy-de':'sh deploy.sh de',
#     'deploy-cn':'sh deploy.sh cn'
# }

# 甚至可以直接构建
# yarn build

# 指令参数
echo $1
if [ $1 = 'de' ] 
then
    # 部署德国服务器
    echo 'Deploy Website on German Server...'
    scp -r ./dist/* root@xxx.xxx.xxx.xxx:/home/your-website
else    
    # 部署阿里云服务器
    echo 'Deploy Website on Alicloud Server...'
    scp -r ./dist/* root@xxx.xxx.xxx.xxx:/home/your-website
fi

# 简单版
yarn build
ssh root@xxx.xxx.xxx.xxx "rm -rf /home/your-website/*"
scp -r ./dist/* root@xxx.xxx.xxx.xxx:/home/your-website

# 实现免密登录远程主机
# 就是用户将自己的公钥储存在远程主机上。登录的时候，远程主机会向用户发送一段随机字符串，用户用自己的私钥加密后，再发回来。远程主机用事先储存的公钥进行解密，如果成功，就证明用户是可信的，直接允许登录shell，不再要求密码。
# 生成公钥和私钥，一路回车
ssh-keygen
# 拷贝公钥到目标服务器
ssh-copy-id root@xxx.xxx.xxx.xxx
# 测试是否可以免密登录主机
ssh root@xxx.xxx.xxx.xxx
