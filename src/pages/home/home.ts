import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';

import { Dbsrv } from '../../providers/dbsrv';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks : any[];
  nav : NavController;
  dbservice : Dbsrv;
  isDBServiceReady: boolean;

  constructor(public navCtrl: NavController, private dbsrv : Dbsrv, public modalCtrl: ModalController) {

    this.nav = navCtrl;
    this.tasks = [];

    this.dbservice = dbsrv;
    this.dbservice.openDatabase();
  }

  ionviewDidLoad() {
    this.showTask();
  }

  public showTask() {
    console.log('Showing tasks...');
    this.dbservice.getTasks();

      // if (this.isDBServiceReady) {
      //   this.dbservice.getTasks()
      //   .then ( (data) => {
          // if (data.rows.length > 0) {
          //   for (var i = 0; i < data.rows.length; i++) {
          //     this.tasks.push({
          //       id: data.rows.item(i).id,
          //       task: data.rows.item(i).task,
          //       priority: data.rows.item(i).priority,
          //       status: data.rows.item(i).status
          //     });
          //   }
          // }
    //    });
    //  }
  }

  showModal(){
    //this.navCtrl.push(ModalPage);
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
    //let modal = Modal.create(ModalPage);
  }
}
