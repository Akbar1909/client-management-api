echo "Switch to master branch"
git checkout master

echo "Building... the production image"
docker build . -t cm-dev -f Dockerfile.dev

echo "Running... containers"
npm run dev

echo "Pushing... the image to docker hub"
docker push akbar1909/cm-dev
