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
    this.dbservice.getTasks()
    .then ( (result) => {
      this.tasks = <Array<Object>> result;
    });
  }

  showModal(){
    //this.navCtrl.push(ModalPage);
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }
}
