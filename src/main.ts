import './index.scss';

import 'zone.js/dist/zone';
import 'reflect-metadata/Reflect.js';

import '@angular/http';
import '@angular/router';
import '@angular/core';
import '@angular/common';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

if (webpack.ENV === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
