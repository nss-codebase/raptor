#!/bin/bash

echo 'changing to code directory'
cd /home/ubuntu/apps/code

echo 'removing raptor directory'
rm -rf raptor

echo 'cloning raptor repository from github'
git clone https://github.com/nss-cohort-2014-06-07/raptor

echo 'changing to raptor directory'
cd raptor

echo 'installing node modules'
npm install

echo 'restarting all projects'
forever restartall

