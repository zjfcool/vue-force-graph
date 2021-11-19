docker run \
-p 8080:80 \
-d --name vueforcegraph \
--mount type=bind,source=$HOME/vue-force-graph/examples/nginx,target=/etc/nginx/conf.d \
--mount type=bind,source=$HOME/vue-force-graph/examples/dist,target=/usr/share/nginx/html \
vueforcegraphcontainer