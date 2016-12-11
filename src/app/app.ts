import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

const item = ['Pepper', 'Salt', 'Paprika'];

@Component({
    selector: 'my-app',
    styleUrls: ['app.css'],
    templateUrl: 'app.html'
})
export class MyApp {
    items: FirebaseListObservable<any[]>;
    keyGenerator: any;
    t : any;
    constructor(af: AngularFire) {
        this.t = af.database;
        const fb:any = af.database;
        this.keyGenerator = fb.fbApp.database().ref().child('book-marker');
        this.items = af.database.list('/book-marker');
    }

    onChange(event) {
        this.items.push({
            id: this.keyGenerator.push().key,
            phrase : event.target.value,
            createAt : new Date().getTime()
        });
        event.target.value = '';
    }
}
