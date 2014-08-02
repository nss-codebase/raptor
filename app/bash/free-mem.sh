#!/bin/bash

# get memory, take 2nd line, and the 4th word
free -hot | sed -n '2p' | awk '{print "Available Memory: " $4}'

