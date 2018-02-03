import { ChartPage } from './../chart/chart';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AddMoviePage } from './../add-movie/add-movie';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import Basepage from '../base';
import { EditMoviePage } from '../edit-movie/edit-movie';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage extends Basepage {

  items = []

  uid = ''
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseFirestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController
  ) {
    super(toastCtrl,loadingCtrl)
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid
    this.showLoading("Fetching data....")
    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('movies')
    .snapshotChanges()
    .subscribe(data => {
      this.items = []

      data.map(action => {
          this.items.push({
            id : action.payload.doc.id,
            data : action.payload.doc.data()
          })
      })
      this.hideLoading()
      },
    (error) => {
      this.hideLoading()
      this.showToast(error)
    })
      
  }

  navigateAddMovie(){
    this.navCtrl.push(AddMoviePage)
  }

  navigateChart(){
    this.navCtrl.push(ChartPage)
  }
delete(movieId){
  this.showLoading("Loading....")
  this.firebaseFirestore
      .collection('users')
      .doc(this.uid)
      .collection('movies')
      .doc(movieId)
      .delete()
      .then(()=>{
        this.hideLoading
        this.showToast("Delete successfuly")
      })
      .catch(error =>{
        this.hideLoading
        this.showToast(error)
      })
}
edit(movieId){
  this.navCtrl.push(EditMoviePage,{
    id : movieId
  })
}
}
