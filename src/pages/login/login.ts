import { RegisterPage } from './../register/register';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import Basepage from '../base';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends Basepage {

  email =''
  password = ''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth:AngularFireAuth,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl, loadingCtrl)
  }

  login(){
    this.showLoading("Logging in...")
    this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(this.email,this.password)
    .then((user) => {
      this.hideLoading()

    })
    .catch((error) => {
        this.hideLoading()
        this.showToast(error.message);
    })
  }

  nevigateRegister(){
    this.navCtrl.push(RegisterPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
