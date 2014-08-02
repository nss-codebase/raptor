#!/bin/bash

echo 'deleting all project directories'
rm -rf /home/ubuntu/apps/portfolio/*

echo 'deleting all pm2 node applications'
pm2 delete all

