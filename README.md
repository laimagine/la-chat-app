# LA Chat app
LA Chat app is an Ionic based peer-to-peer video chat web app.

It uses [Simple Peer](https://github.com/feross/simple-peer) and [Simple Websocket](https://github.com/feross/simple-websocket) along with with [LA Chat server](https://github.com/laimagine/la-chat-server).

All the [WebRTC](https://en.wikipedia.org/wiki/WebRTC) based peer to peer video chat examples show browsers on the same computer. This project builds on those examples and provides a more practical solution where the callers are on many different computers.

### Pre-requisistes
- Install [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
- Install [Ionic](https://ionicframework.com/) though this project can be adapted to run on plain javascript
- [LA Chat server](https://github.com/laimagine/la-chat-server) to be running on `https://127.0.0.1:8443`
- Make sure that `http://<server-ip>:8100` is allowed by router/firewall
- Make sure browser has permissions to use camera and mic (on chrome, visit: chrome://settings/content?search=camera and update settings)

### Setup
- Clone the repository
- Run `npm install`
- Run `ionic server`

### Use
- Visit `http://<server-ip>:8100`
- The first user that connects to this server has to wait till another user connects
- As soon as another user visits `http://<server-ip>:8100`, the two 

### FAQs
- How to connect to [LA Chat server](https://github.com/laimagine/la-chat-server) that is using self signed certificate?
  - paste `chrome://flags/#allow-insecure-localhost` in browser and change setting to enable
  - go to `https://<server-ip>:8443` and follow the prompts to allow unsigned certificates

### Special thanks to:
- https://github.com/feross/simple-peer
- https://github.com/feross/simple-websocket
