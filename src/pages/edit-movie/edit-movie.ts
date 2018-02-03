import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import Basepage from '../base';
import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-edit-movie',
  templateUrl: 'edit-movie.html',
})
export class EditMoviePage extends Basepage {
  id:string
  uid:string

  name:string
  description:string
  length:number
  image:string


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public firebaseAuth:AngularFireAuth,
              public firebaseFirestore:AngularFirestore,
              public toasrCtrl:ToastController,
              public loadingCtrl:LoadingController
            
            ) {
              super(toasrCtrl,loadingCtrl)
                this.id = this.navParams.get('id');

  }


  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid

    this.firebaseFirestore
        .collection('users')
        .doc(this.uid)
        .collection('movies')
        .doc(this.id)
        .valueChanges()
        .subscribe((movie:any) => {
          console.log(movie)
          this.name = movie.name
          this.description = movie.description
          this.length = movie.length
          this.image = movie.img 
        })
  }
  
  save(){
    this.loadingCtrl
    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('movies')
    .doc(this.id)
    .update({
      name: this.name,
      description: this.description,
      length: this.length,
      img: this.image
    })
    .then(()=>{
      this.showToast('Save!')
      this.navCtrl.pop()
      this.hideLoading
    })
    .catch(error => {
      this.showToast(error)
      this.hideLoading
    })
  }

}
