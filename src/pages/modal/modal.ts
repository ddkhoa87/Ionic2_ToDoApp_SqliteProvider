import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Dbsrv } from '../../providers/dbsrv';
/*
  Generated class for the Modal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {

  nav: NavController;
  viewCtrl: ViewController;
  alertCtrl: AlertController;
  dbservice: Dbsrv;
  priorityDefault: string;
  task: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, viewCtrl: ViewController, alertCtrl: AlertController, dbsrv : Dbsrv) {
    this.nav = navCtrl;
    this.viewCtrl = viewCtrl;
    this.alertCtrl = alertCtrl;
    this.dbservice = dbsrv;
    this.priorityDefault = "normal";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  saveTask() {
    if (this.task == undefined || this.task == '')
    {
      let alert = this.alertCtrl.create( {
        title: 'Warning',
        subTitle: 'Please enter task',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      let newTask = {
        task: this.task,
        priority: this.priorityDefault
      };
      this.dbservice.saveTask(newTask)
      .then ( () => {
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Task Added',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.close();
            }
          }]
        });
        alert.present();
      }) //;
      .catch(err => {
            console.log(err);
          });
    }
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
