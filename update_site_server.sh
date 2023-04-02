#!/bin/sh

if [ "$1" = "" ]; then
  echo "Please re-run with croc code."
  exit 1
fi

mkdir daisho-explorer-release/ 2>/dev/null
cd daisho-explorer-release/

croc "$1"
tar -xzf der.archive
