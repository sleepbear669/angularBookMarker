import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import 'hammerjs';

import { MyApp } from './app/app';

export const firebaseConfig = {
    apiKey: "AIzaSyBna5qqyCXl0ozTj9_CrEOFXygThsjb8Fg",
    authDomain: "flickering-inferno-1056.firebaseapp.com",
    databaseURL: "https://flickering-inferno-1056.firebaseio.com",
    storageBucket: "flickering-inferno-1056.appspot.com"
};

@NgModule({
  imports: [
      BrowserModule,
      HttpModule,
      MaterialModule.forRoot(),
      AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [ MyApp],
  bootstrap: [ MyApp ]
})
export class AppModule {}
