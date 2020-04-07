#!/bin/sh
# 进入到仓库目录，拉取最新代码，编译，删除原来的文件，复制最新静态文件
cd ../projectRepository
git pull
npm run build
rm -rf /home/projectFolderName/*
cp -r /home/projectRepository/dist/* /home/projectFolderName
