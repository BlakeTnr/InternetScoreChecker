# Server

## Building
To build the javascript files, in this directory run
`tsc`

## Docker testing
To test using docker, use the following docker command
`docker run -it -v LOCALPATHHERE:/usr/src/app -w /usr/src/app -p 80:80 --rm node:latest node built/index.js teams=10.x.1.1,10.x.1.2 teamsamount=1`
(example teams IPs and example team amount)