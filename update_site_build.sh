#!/bin/sh

if [ "$1" = "" ]; then
  echo "Please re-run with croc code."
  exit 1
fi

# Build
bash etc/scripts/build-dist.sh

# Zip
tar -czf der.archive -C out/ .

# Send
croc send --code "$1" der.archive
rm der.archive 2>/dev/null
