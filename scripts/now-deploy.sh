#!/bin/bash
now rm rucken-core-nestjs -y
now --public
now alias
now --local-config postgres-now.json --public
now --local-config postgres-now.json alias
read -p "Press any key to continue... " -n1 -s
