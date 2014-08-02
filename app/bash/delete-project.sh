#!/bin/bash

echo 'deleting project directory'
rm -rf /home/ubuntu/apps/portfolio/$2

echo 'deleting project from pm2'
pm2 delete $1

