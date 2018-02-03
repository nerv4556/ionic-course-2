import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import Basepage from '../base';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends Basepage {
  email =''
  password = ''
  displayName = ''
  tel : string = ''
  age : number 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl, loadingCtrl)
  }

  register(){
    console.log(this.email,this.displayName,this.password,this.tel,this.age)
    this.showLoading("Registering....")
    this.firebaseAuth
    .auth
    .createUserWithEmailAndPassword(this.email,this.password)
    .then((user) => {
      user.updateProfile({
        displayName : this.displayName,
        photoURL : 'https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/17098443_1274004232653745_6651222826764703491_n.jpg?oh=4001e8246cba1caf49f07de2d44e712a&oe=5AE26EC8'
      })

      this
      .firebaseFirestore
      .collection('users')
      .doc(user.uid)
      .set({
        name : this.displayName,
        email : this.email,
        tel : this.tel,
        age : this.age
      })
    this.hideLoading();
    })
    .catch((error)=>{
      this.hideLoading()
      this.showToast(error.message)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
