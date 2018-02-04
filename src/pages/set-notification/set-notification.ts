import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { every } from '@firebase/util';
import Basepage from '../base';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the SetNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-notification',
  templateUrl: 'set-notification.html',
})
export class SetNotificationPage extends Basepage {

    date:string
    time:string
    movie:any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public localNotifications: LocalNotifications,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController
  
  ) {
    super(toastCtrl,loadingCtrl)
    this.movie = this.navParams.get('movie')
    console.log(this.movie)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetNotificationPage');
  }

  set(){
    let parsedDateTime = Date.parse(this.date+' '+this.time)
    let datetime = new Date(parsedDateTime)
    console.log(datetime.toDateString())
    this.localNotifications.schedule({
      id: 1,
      text: 'แจ้งเตือนดูหนัง' + this.movie.date.name,
      firstAt : datetime,
      every : 'minute'
    })

    this.showToast(JSON.stringify(this.localNotifications.get(1)))


  }

  turnOff(){
    this.localNotifications.cancel(this.movie.id)
    .then((result)=>{
       alert(result)
    })
    .catch((error) =>{
      alert(error)
    })
  }

  
}
