import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';

import { Platform } from 'ionic-angular';
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
  platform : Platform;

  constructor(public navCtrl: NavController, private dbsrv : Dbsrv, platform: Platform) {
    this.platform = platform;

    this.nav = navCtrl;
    this.tasks = [];
    this.tasks.push({task:'task1', priority:'low', status:'pending'});
    this.tasks.push({task:'task2', priority:'high', status:'pending'});
    this.tasks.push({task:'task3', priority:'normal', status:'pending'});
    this.tasks.push({task:'task4', priority:'low', status:'done'});
    this.tasks.push({task:'task5', priority:'normal', status:'pending'});

    this.dbservice = dbsrv;
    // if (this.dbservice.isDBReady()) {
    //     this.showTask();
    // }
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
    this.navCtrl.push(ModalPage);
  }
}
