#!/bin/bash
# This script checks if the container is started for the first time.
set -x
CONTAINER_FIRST_STARTUP="CONTAINER_FIRST_STARTUP"
if [ ! -e /$CONTAINER_FIRST_STARTUP ]; then
    touch /$CONTAINER_FIRST_STARTUP
    # place your script that you only want to run on first startup.
    ./wait-for-it.sh -t 30 mysql:3306 -- npm run deploy:db && npm run deploy:seed
else
    # script that should run the rest of the times (instances where you
    # stop/restart containers).
    npm run dev
fi
