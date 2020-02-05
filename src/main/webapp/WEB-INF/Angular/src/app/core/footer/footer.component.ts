import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from "subsink";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

    constructor(public dialog: MatDialog) {
    }

    subs = new SubSink();

    ngOnInit() {
    }

    /* openContactUs(){
       const dialogRef = this.dialog.open(ContactUsWindowComponent, {
         width: '300px',
         height: '400px',
       });

       this.subs.sink = dialogRef.afterClosed().subscribe(result => {
       });
     }*/

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
