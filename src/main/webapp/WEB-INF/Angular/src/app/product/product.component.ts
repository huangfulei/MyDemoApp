import {Component, OnInit} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./product";
import {MatDialog} from "@angular/material/dialog";
import {LogInReminderComponent} from "../shared/pop-up/log-in-reminder/log-in-reminder.component";
import {UserSessionService} from "../core/services/user-session.service";
import {isNotNull} from "../shared/utility/common.utility";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    /*animations: [
        trigger('buttonTextStateTrigger', [
            state('shown', style({
                opacity: 1
            })),
            state('transitioning', style({
                opacity: 0.3
            })),
            transition('shown => transitioning', animate('600ms ease-out')),
            transition('transitioning => shown', animate('600ms ease-in'))
        ])
    ]*/
})
export class ProductComponent implements OnInit {
    public name: string;
    public description: string;
    public price: number;
    public products: Array<Product>;
    // The current state of the button text
    public buttonTextState = 'shown';
    // The text currently being show
    public buttonText = 'ADD TO CART';
    // The text that will be shown when the transition is finished
    public transitionButtonText = 'ADD TO CART';

    constructor(private readonly productService: ProductService,
                private readonly userSessionService: UserSessionService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.loadProducts();
    }

    public changeImg(sourceImg: any, targetImage: any) {
        sourceImg.src = targetImage.src;
    }

/*    /!**
     * Respond to the transition event of the button text
     * by setting the text awaiting transition then setting the state as shown
     *!/
    public buttonTextTransitioned() {
        this.buttonText = this.transitionButtonText;
        this.buttonTextState = this.buttonTextState = 'shown';
    }*/

    public onAddToCart(product: Product) {

        if (isNotNull(this.userSessionService.getUser())) {
            this.openLoginReminder();
        } else {

            console.log(product);
            this.productService.addItemToCart(product);
            // todo: text transition
/*            // Kick off the first transition
            this.buttonTextState = 'transitioning';
            this.transitionButtonText = 'ADDED';

            // Do whatever logic here. If it is asynchronous, put the remaining code in your subscribe/then callbacks
            //this.productService.addItemToCart(product);

            // Note if your logic is snappy, you could leave the timeouts in to simulate the animation for a better UX
            setTimeout(() => {
                this.buttonTextState = 'transitioning';
                this.transitionButtonText = 'ADD TO CART';
            }, 1500);*/
        }
    }

    private loadProducts() {
        this.productService.getProducts().subscribe(data => {
                console.log(data);
                this.products = data;
            },
            (error => {
                console.log(error);
            }));
    }

    private openLoginReminder() {
        const dialogRef = this.dialog.open(LogInReminderComponent, {
            width: '600px',
            height: '200px',
        });
    }

    /*    public trackBy(index, item){
            console.log(index, item);
        }*/
}
