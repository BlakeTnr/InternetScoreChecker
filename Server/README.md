# Server

## Docker testing
To test using docker, use the following docker command
`docker run -it --name my-running-script -v PUTLOCALPATHHERE:/usr/src/app -w /usr/src/app -p 80:80 --rm node:latest node index.js`