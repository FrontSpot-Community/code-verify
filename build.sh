yarn install
yarn run build
docker build -t code-verify .
docker tag code-verify:latest frontspot/code-verify:latest
docker login
docker push frontspot/code-verify:latest
