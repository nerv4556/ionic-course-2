import { TabPageModule } from './../tab/tab.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import Basepage from '../base';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage extends Basepage {

  name = ''
  email = ''
  photoURL =''
  age:number
  tel =''

  uid=''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public toastCtrl : ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl,loadingCtrl)
  }

  ionViewDidLoad() {
    
    this.email = this.firebaseAuth.auth.currentUser.email
    this.name = this.firebaseAuth.auth.currentUser.displayName
    this.photoURL = this.firebaseAuth.auth.currentUser.photoURL
    
    this.uid = this.firebaseAuth.auth.currentUser.uid;
    console.log(this.uid)
    this.firebaseFirestore
        .collection('users')
        .doc(this.uid)
        .valueChanges()
        .subscribe((data:any) => {
          this.age = data.age 
          this.tel = data.tel
          console.log(data);
        })
  }

  logout(){
    this.showToast("Logout Success");
    this.firebaseAuth.auth.signOut();
  }

}
