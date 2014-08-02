#!/bin/bash

echo 'deleting old directory'
pwd
rm -rf $1

echo '1. cloning github repository'
git clone $2

echo '2. installing node application'
cd $1
pwd
$3

echo '3. re-starting all node applications'
pm2 restart all

