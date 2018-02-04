import { SetNotificationPage } from './../pages/set-notification/set-notification';
import { ChartPage } from './../pages/chart/chart';
import { AddMoviePage } from './../pages/add-movie/add-movie';
import { RegisterPage } from './../pages/register/register';
import { TabPage } from './../pages/tab/tab';
import { ProfilePage } from './../pages/profile/profile';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { EditMoviePage } from '../pages/edit-movie/edit-movie';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

var config = {
  apiKey: "AIzaSyAEmjIlymqsDqC45PtwIQEheRZzZhd9vnU",
  authDomain: "ionic-course-b9bf5.firebaseapp.com",
  databaseURL: "https://ionic-course-b9bf5.firebaseio.com",
  projectId: "ionic-course-b9bf5",
  storageBucket: "ionic-course-b9bf5.appspot.com",
  messagingSenderId: "622925659801"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    ListPage,
    TabPage,
    LoginPage,
    RegisterPage,
    AddMoviePage,
    EditMoviePage,
    ChartPage,
    SetNotificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    ListPage,
    TabPage,
    LoginPage,
    RegisterPage,
    AddMoviePage,
    EditMoviePage,
    ChartPage,
    SetNotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,BarcodeScanner
  ]
})
export class AppModule {}
