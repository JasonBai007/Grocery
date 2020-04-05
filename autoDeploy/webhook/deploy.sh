#!/bin/sh

# 要执行的命令，拉取仓库最新代码，编译，删除原来的文件，复制最新静态文件
cd ../projectRepository
git pull
npm run build
rm -rf /home/projectFolderName/*
cp -r /home/projectFolderName-deployment/projectRepository/dist/* /home/v2x
