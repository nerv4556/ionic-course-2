import { RegisterPage } from './../pages/register/register';
import { TabPage } from './../pages/tab/tab';
import { ProfilePage } from './../pages/profile/profile';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AddMoviePage } from './../pages/add-movie/add-movie';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public firebaseAuth: AngularFireAuth
  ) {
    platform.ready().then(() => {
      
    this.firebaseAuth
        .authState
        .subscribe((user) => {
           if(user){
            this.rootPage = TabPage
        }else{
            this.rootPage = LoginPage
        }
        console.log(user);
    })

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}