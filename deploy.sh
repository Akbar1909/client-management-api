echo "Switching to master branch"
git checkout master

echo "Building the production image"
npm run prod:build

echo "Run containers"
npm run prod:run

echo "Push the image to docker hub"
docker push akbar1909/cm-prod
