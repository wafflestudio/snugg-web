#!/bin/sh

set -ex
. ./.env

# build locally
yarn install
yarn build

# update server's branch & stop server
git push
curr_br=$(git rev-parse --abbrev-ref HEAD)
(
echo "cd snugg-web"
echo "git restore ."
echo "git checkout ${curr_br}"
echo "git pull"
echo "pm2 stop snugg-web"
echo "yarn install"
echo "exit"
) | ssh -i "$KEY_FILE" "$USER@$HOST"

# upload build files
rm -r ../.next/cache
scp -i "$KEY_FILE" -r ../.next "$USER@$HOST":~/snugg-web/

# start server
ssh "$USER@$HOST" -i "$KEY_FILE" "pm2 start snugg-web"
