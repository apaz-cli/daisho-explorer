#!/bin/sh

if [ "$1" = "" ]; then
  echo "Please re-run with croc code."
  exit 1
fi

sh etc/scripts/build-dist.sh

tar -czf der.archive out/

croc send --code "$1" out/dist-bin/daisho-explorer-release.tar.xz

croc send --code "$1" out/dist-bin/daisho-explorer-release.static.tar.xz
