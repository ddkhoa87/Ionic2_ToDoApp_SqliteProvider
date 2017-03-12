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
  }

  openDatabase() {

    return new Promise(resolve => {
      this.storage = new SQLite();
      this.platform.ready()
      .then ( () => {
        this.storage = new SQLite();
        console.log('Opening database.');

        this.storage.openDatabase({
          name: 'data.db',
          location: 'default' // the location field is required
        })
        .then ( () => {
          console.log('Opened database.');

          this.storage.executeSql('create table IF NOT EXISTS tbtask (id iteger primary key autoincrement, ask text, priority text, status text)', {})
          .then(()=>{
            console.log('Created table.');
            this.isDBOpen = true;
            this.getTasks().
            then ( (tasks) => {
              resolve(tasks);
            });

          });
        });
      });
    });
  }

  public getTasks() {
    console.log('Getting tasks...');
    return new Promise ( (resolve, reject) => {
        this.storage.executeSql('select * from tbtask',{})
        .then( (data) => {
          let tasks = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              tasks.push({
                id: data.rows.item(i).id,
                task: data.rows.item(i).task,
                priority: data.rows.item(i).priority,
                status: data.rows.item(i).status
              });
            }
            resolve (tasks);
          }
        }, (error) => {
          console.log('Failed loading tasks.');
          reject (error);
        });
    });
  }

  public saveTask(item) {
    console.log('Saving task...');
    console.log(item.task);

    return new Promise ( (resolve, reject) => {
      this.storage.executeSql('insert into tbtask (task, priority, status) values \
                                    (\'' + item.task + '\', \'' + item.priority + '\', \'pending\')',{})
      .then ( (data) => {
        console.log ('Added task.');
        resolve(data);
      }, (error) => {
        console.log('Failed saving task.');
        reject(error);
      });
    });
  }

  public isDBReady() {
    return this.isDBOpen;
  }
}
