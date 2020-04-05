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

