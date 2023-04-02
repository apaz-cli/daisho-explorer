#!/bin/sh

if [ "$1" = "" ]; then
  echo "Please re-run with croc code."
  exit 1
fi

mkdir daisho-explorer-release/ 2>/dev/null
cd daisho-explorer-release/

croc "$1"

sleep 1

croc "$1"

