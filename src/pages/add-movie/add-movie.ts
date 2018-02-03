import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import Basepage from '../base';

@Component({
  selector: 'page-add-movie',
  templateUrl: 'add-movie.html',
})
export class AddMoviePage extends Basepage {

    name = ''
    length:Number
    description =''
    img = ''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseFirestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    super(toastCtrl, loadingCtrl)
  }

  create(){
    this.firebaseFirestore
        .collection('users')
        .doc(this.firebaseAuth.auth.currentUser.uid)
        .collection('movies')
        .add({
          name: this.name,
          description: this.description,
          length: this.length,
          img: this.img
        })
        .then(() => {
          this.navCtrl.pop();
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMoviePage');
  }

}
