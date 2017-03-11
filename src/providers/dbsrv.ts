import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
/*
  Generated class for the Dbsrv provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Dbsrv {

  private storage : SQLite;
  private isDBOpen : boolean;
  private platform : Platform;

  constructor(public http: Http, platform: Platform) {
    console.log('Hello Dbsrv Provider');

    this.platform = platform;
    this.isDBOpen = false;
    //this.openDatabase();
  }

  openDatabase() {
    this.storage = new SQLite();

    // console.log('Opening database.');
    // this.storage.openDatabase({
    //   name: 'data.db',
    //   location: 'default' // the location field is required
    // });
    // console.log('Opened database.');
    //
    // this.storage.executeSql('create table IF NOT EXISTS tbtask (id integer primary key autoincrement, task text, priority text, status text)', {});
    // console.log('Created table.');
    //
    // this.isDBOpen = true;

    if (!this.isDBOpen) {
      this.platform.ready()
      .then(() => {
          this.storage = new SQLite();
          console.log('Opening database.');
          this.storage.openDatabase({
            name: 'data.db',
            location: 'default' // the location field is required
          })
          .then(() => {
              console.log('Opened database.');
              this.storage.executeSql('create table IF NOT EXISTS tbtask (id integer primary key autoincrement, task text, priority text, status text)', {})
              .then(()=>{
                  console.log('Created table.');
                  this.isDBOpen = true;
              });
          });
      });
    }
  }

  public getTasks() {
    console.log('Getting tasks...');
    return new Promise ( (resolve, reject) => {
        this.storage.executeSql('select * from tbltask',{})
        .then ( (data) => {
          resolve (data);
        }, (error) => {
          reject (error);
        });
    });

    // if (this.isDBOpen) {
    //     console.log('Getting tasks.');
    //     return this.storage.executeSql('select * from tbltask',{});
    // } else {
    //   console.log('DB is not opening. Try reopening again...');
    //   this.openDatabase();
    // }
  }

  public isDBReady() {
    return this.isDBOpen;
  }
}
