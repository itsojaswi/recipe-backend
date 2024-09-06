docker build -t recipe-backend:appv1 .
docker run  -d -p 4000:4000 -v $(pwd)/.env:/home/node/app/.env recipe-backend:appv1
