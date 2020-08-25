#!/bin/bash

npm run start:prod &

npx lhci healthcheck --fatal
npx lhci collect --url=http://localhost:5000
npx lhci assert --preset="lighthouse:recommended"
lhci upload --target=temporary-public-storage

EXIT_CODE=$?

kill $!
exit $EXIT_CODE
