#!/bin/bash

# 使用方法：sh push.sh
git add .
read -p "Input commit message:" input
echo $input
git commit -m $input
git push
echo 'pushed'