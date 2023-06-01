#!/bin/bash
# This script checks if the container is started for the first time.
set -x
CONTAINER_FIRST_STARTUP="CONTAINER_FIRST_STARTUP"
if [ ! -e /$CONTAINER_FIRST_STARTUP ]; then
    touch /$CONTAINER_FIRST_STARTUP
    # place your script that you only want to run on first startup.
    ./wait-for-it.sh -t 30 -h mysql -p 3306 -- \
        npx prisma migrate deploy \
        && npx prisma db seed \
        && npm run dev
else
    # script that should run the rest of the times (instances where you
    # stop/restart containers).
    npm run dev
fi
