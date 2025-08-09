rsync -avz \
  -e "ssh -p 22 -o StrictHostKeyChecking=no" \
  dist/ root@168.231.118.186:/www/wwwroot/dpn-pppi.org/dish