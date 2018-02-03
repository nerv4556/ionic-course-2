import { ListPage } from './../list/list';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {

  tab1 = ProfilePage;
  tab2 = ListPage;
  tab3 = TabPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPage');
  }

}
