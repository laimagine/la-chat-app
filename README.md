# la-chat-app
LA Chat app is an Ionic peer-to-peer video chat web app.

It uses [Simple Peer](https://github.com/feross/simple-peer) and [Simple Websocket](https://github.com/feross/simple-websocket) to communicate with [LA Chat server](https://github.com/laimagine/la-chat-app).

All the [WebRTC](https://en.wikipedia.org/wiki/WebRTC) based peer to peer video chat examples show browsers side-by-side, on the same computer. This project builds on those examples and provides a more practical solution where the callers are on different computers.

### Pre-requisistes
- Install [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
- Install [Ionic](https://ionicframework.com/) though this project can be adapted to run on plain javascript
- [LA Chat server](https://github.com/laimagine/la-chat-app) to be running on `https://127.0.0.1:8443`

### Setup
- Clone the repository
- Run `npm install`
- Run `ionic server`

### Use
- Access the url `http://<server-ip>:8100`

### FAQs
- If testing using Chrome on `localhost` with a self-signed certificate, paste `chrome://flags/#allow-insecure-localhost` in browser and change the setting to enable

### Special thanks to:
- https://github.com/feross/simple-peer
- https://github.com/feross/simple-websocket
