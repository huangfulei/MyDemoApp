import {Component, OnInit} from '@angular/core';
import {LoadingIndicatorService} from "./loading-indicator.service";

@Component({
    selector: 'app-loading-indicator',
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit {

    public color = 'primary';
    public mode = 'indeterminate';
    public value = 50;
    public showLoadingIndicator = false;


    constructor(private readonly loadingIndicatorService: LoadingIndicatorService) {
    }

    ngOnInit() {
      this.loadingIndicatorService.subscribe((loading: boolean)=>{
        this.showLoadingIndicator = loading;
      })
    }
}
