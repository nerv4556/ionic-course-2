import { SetNotificationPage } from './../set-notification/set-notification';
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
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage extends Basepage {

  items = []
  results =[]

  uid = ''
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseFirestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public barcodeScanner: BarcodeScanner
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

      this.results = this.items
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

  navigateNotification(movie){
    this.navCtrl.push(SetNotificationPage,{
      movie : movie
    })
    
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
getItem(event){
  let val = event.target.value

  if(val == ''){
    this.results = this.items
  }

  if (val && val.trim() != ''){
    this.results = this.items.filter((item) => {
      return(item.data.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
    })
  }
}

getItemFromBarcode(code){


  if(code == ''){
    this.results = this.items
  }

  if (code && code.trim() != ''){
    this.results = this.items.filter((item) => {
      return(item.data.name.toLowerCase().indexOf(code.toLowerCase()) > -1)
    })
  }
}

scanBarCode(){
  this.barcodeScanner.scan().then((barcodeData) => {
    this.getItemFromBarcode(barcodeData.text)
   }, (err) => {
       // An error occurred
   });
}
}
