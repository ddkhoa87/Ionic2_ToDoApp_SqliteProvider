import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ModalPage } from '../pages/modal/modal';
import { Dbsrv } from '../providers/dbsrv';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalPage,
  ],
  providers: [Dbsrv, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
