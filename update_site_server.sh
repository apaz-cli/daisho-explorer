#!/bin/sh

if [ "$1" = "" ]; then
  echo "Please re-run with croc code."
  exit 1
fi

# Find installation folder
cd "/home/$USER"
rm -rf daisho-explorer-release/ 2>/dev/null
mkdir daisho-explorer-release/ 2>/dev/null
cd daisho-explorer-release/

# Receive files
croc --yes "$1"

# Open into install folder
tar -xzf der.archive
rm der.archive

# Move static files onto serve path
cp -r webpack/static/ dist/
