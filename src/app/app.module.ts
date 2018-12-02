import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// App
import { MyApp } from './app.component';

// Pages
import { ChatPage } from '../pages/features/chat/chat-page';

// Components
import { ChatComponent } from '../components/chat-component/chat-component';

@NgModule({
  declarations: [
    MyApp,
    ChatComponent,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage
],
  providers: [
    Camera,
    NativeAudio,
    SplashScreen,
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule { }