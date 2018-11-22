import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Peer from 'simple-peer';
import * as Socket from 'simple-websocket';

const SOCKET_SERVER: string = 'wss://127.0.0.1:8443';

@Component({
  selector: 'chat-component',
  templateUrl: 'chat.html'
})
export class ChatComponent implements OnDestroy, OnInit {

  ip: string = SOCKET_SERVER;

  private connection: any;
  private socket: Socket;
  private peer: Peer;
  private localStream: MediaStream;
  private remoteStream: MediaStream;

  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.setup();
  }

  ngOnDestroy(): void {
    this.teardown();
  }

  private setup(): void {
    console.log('setup');
    if (this.socket) return;

    this.connection = {localId: `Connection-${Date.now()}`};
    this.socket = new Socket(this.ip);
    this.socket.once('connect', () => {
      console.log('Socket connect');
      this.connection.type = 'register';
      this.socket.send(JSON.stringify(this.connection));
    });
    this.socket.on('close', (data: any) => {
      console.log('Socket close: ', data);
      this.closePeer();
    });
    this.socket.on('error', (error: any) => {
      console.error('Socket error: ', error);
      this.closePeer();
    });

    this.socket.on('data', (message) => {
      try {
        message = JSON.parse(message);
        console.log('Socket data: ', message);
        if (message.type === 'ready') {
          this.connection.type = 'live';
          console.log('ready connection: ', this.connection);
          this.socket.send(JSON.stringify(this.connection));
        } else if (message.type === 'call') {
          this.connection.remoteId = message.remoteId;
          this.connection.initiator = message.data && message.data.initiator;
          console.log('call connection: ', this.connection);
          this.accept();
        } else if (message.type === 'signal') {
          console.log('signal connection: ', this.connection);
          this.peer.signal(message.data);
        } else if (message.type === 'hangup') {
          console.log('hangup connection: ', this.connection);
          this.closePeer(message.data);
        } else if (message.type === 'close') {
          console.log('close connection: ', this.connection);
          this.teardown();
        }
      } catch (err) {
        console.error('Socket error: ', err);
      }
    });
  }

  private accept(): void {
    if (!this.localStream) {
      this.setupCamera()
      .then(() => { this.setupPeer(); } );
    } else {
      this.setupPeer();
    }
  }

  private setupPeer(): void {
    console.log('setupPeer');

    if (this.peer) return;

    this.socket = new Socket(this.ip);
    this.peer = new Peer({
      initiator: this.connection.initiator,
      stream: this.localStream
    });
    console.log('peer: ', this.peer);
    this.peer.on('error', (err) => {
      console.error('Peer error: ', err);
    });
    this.peer.on('connect', () => {
      console.log('Peer connect');
    });
    this.peer.on('signal', (data) => {
      console.log('Peer signal: ', data);
      this.connection.type = 'signal';
      this.connection.data = data;
      this.socket.send(JSON.stringify(this.connection));
    });
    this.peer.on('stream', (remoteStream: MediaStream) => {
      console.log('Peer stream: ', remoteStream);
      this.remoteStream = remoteStream;
    });
    this.peer.on('data', (data) => {
      console.log('Peer data: ', data);
    });
    this.peer.on('close', () => {
      this.teardown();
    });
  }

  private setupCamera(): Promise<void> {
    console.log('setupCamera');
    if (this.localStream) return;
    return navigator
      .mediaDevices.getUserMedia({ audio: true, video: { facingMode: "user" } })
      .then((stream: MediaStream) => {
        console.log('user media success ', stream);
        this.localStream = stream;
      })
      .catch((error) => {
        console.error('user media error ', error);
      });
  }

  hangup(): void {
    this.teardown();
  }

  private teardown(): void {
    if (this.remoteStream) {
      this.localStream.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop();
      });
    }
    this.remoteStream = null;
    
    if (this.localStream) {
      this.localStream.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop();
      });
    }
    this.localStream = null;

    this.closePeer();
  }

  private closePeer(data?: any): void {
    console.log('Peer close: ', data);
    delete this.connection;
    if (this.peer) this.peer.destroy();
  }
}