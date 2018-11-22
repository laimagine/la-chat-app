import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'camera-component',
  templateUrl: 'camera.html'
})
export class CameraComponent {

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    private camera: Camera,
    private viewCtrl: ViewController) {
      this.cameraTakePicture();
  }

  cameraTakePicture(): void {
    this.camera
      .getPicture(this.cameraOptions)
      .then(
        (imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          this.viewCtrl.dismiss({ data: base64Image });
        }, (err) => {
          this.viewCtrl.dismiss({ error: err });
        }
      );
  }
}