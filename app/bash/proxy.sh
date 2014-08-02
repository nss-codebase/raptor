#!/bin/bash

echo 'deleting cached node modules'
sudo rm -rf /home/ubuntu/.npm

echo 'changing to portfolio directory'
cd /home/ubuntu/apps/portfolio

echo 'removing proxy directory'
rm -rf proxy

echo 'cloning proxy repository from github'
git clone https://github.com/nss-cohort-2014-06-07/proxy

echo 'changing to proxy directory'
cd proxy

echo 'installing node modules'
npm install

echo 'restarting all projects'
pm2 restart all

