#!/bin/bash

# get cpu data, take 4th row, 12th column
mpstat -P ALL | sed -n '4p' | awk '{print "Available CPU: " $12}'

