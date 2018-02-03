import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component,ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart:any

  datas = []
  labels = []

  uid=''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseFirestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController
  
  ) {
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid
    console.log(this.uid)
    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('movies')
    .valueChanges()
    .subscribe(movies => {
      this.datas = movies.map((movie:any)=>{
        return movie.length;
      })

      this.labels = movies.map((movie:any)=>{
        return movie.name;
      })
      console.log(this.datas)
      console.log(this.labels)
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
        type: 'line',
        data: {
            labels: this.labels,
            datasets: [
                {
                    label: "Movie Sats",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.datas,
                    spanGaps: false,
                }
            ]
        }
  
    });

    })

    
  }

}
