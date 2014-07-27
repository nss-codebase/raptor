#!/bin/bash

echo 'deleting old directory'
pwd
rm -rf $1

echo 'cloning github repository'
git clone $2

echo 'installing node application'
cd $1
pwd
$3

echo 'starting node application'
echo $4
eval $4

