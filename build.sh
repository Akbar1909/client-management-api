echo "Switching to master branch"
git checkout master

echo "Building the production image"
docker build . -t cm-prod -f Dockerfile.prod

echo "Run containers"
npm run prod

echo "Push the image to docker hub"
docker push akbar1909/cm-prod
