#!/bin/sh

NODE="/usr/bin/node"
EXTRA_ARGS=""

BN="$(basename \"$PWD \" )"
if [ "$BN" = "daisho-explorer" ]; then
  if [ -d daisho-explorer-release ]; then
    cd daisho-explorer-release/
  else
    echo "Cannot find release folder. Use the update_site_server script."
    exit 1
  fi
fi

cd dist/
env NODE_ENV=production "$NODE" app.js --webpackContent webpack/static $EXTRA_ARGS



