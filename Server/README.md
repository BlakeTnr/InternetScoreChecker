# Server

## Docker testing
To test using docker, use the following docker command
`docker run -it -v PUTLOCALPATHHERE:/usr/src/app -w /usr/src/app -p 80:80 --rm node:latest node index.js teams=10.x.1.1,10.x.1.2 teamsamount=1`
(example teams IPs and example team amount)