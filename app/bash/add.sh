#!/bin/bash

echo 'deleting cached node modules'
sudo rm -rf /home/ubuntu/.npm

echo 'deleting old directory'
rm -rf $1

echo 'cloning github repository'
git clone $2

echo 'installing node application'
cd $1
$3

echo 'starting node application'
eval $4

