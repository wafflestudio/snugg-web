#!/bin/sh

set -ex
. ./.env

# build locally
yarn install
yarn build

# update server's branch & stop server
git push
curr_br=$(git rev-parse --abbrev-ref HEAD)
ssh -i "$KEY_FILE" "$USER@$HOST" /bin/bash <<'EOF'
cd snugg-web
git restore .
git checkout "$curr_br"
git pull
pm2 stop snugg-web
EOF

# upload build files
rm -r ../.next/cache
scp -i "$KEY_FILE" -r ../.next "$USER@$HOST":~/snugg-web/

# start server
ssh "$USER@$HOST" -i "$KEY_FILE" <<'EOF'
pm2 start snugg-web
EOF
