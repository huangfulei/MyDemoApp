import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

declare var Stripe: any;

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

    private stripe = Stripe('pk_test_8FsSEQYHkqVZ0TA93UvX59pL00Be9qct5C');
    private elements = this.stripe.elements();
    private cardHandler = this.onChange.bind(this);
    public error: string;
    private card: any;
    public addressForm: FormGroup;
    public paymentForm: FormGroup;
    public orderNumber: number;
    private clientSecret: string;
    public buttonDisabled: boolean = false;

    constructor(private http: HttpClient,
                private cd: ChangeDetectorRef,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.addressForm = this.fb.group({
            firstCtrl: ['', Validators.required]
        });
        this.paymentForm = this.fb.group({
            secondCtrl: ['', Validators.required]
        });
        this.http.get<any>('/intent').subscribe(data => {
            this.clientSecret = data.clientSecret;
            console.log(this.clientSecret);
        })
    }

    ngAfterViewInit() {
        const style = {
            base: {
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#aab7c4"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        };
        this.card = this.elements.create('card', {style: style});
        this.card.mount('#card-info');
        this.card.addEventListener('change', this.cardHandler);
    }

    onChange({error}) {
        if (error) {
            this.error = error.message;
        } else {
            this.error = null;
        }
        this.cd.detectChanges();
    }

    async onSubmit(form?: NgForm) {
        this.changeLoadingState(true);
        // todo: disable the submit button
        this.buttonDisabled = true;
        // todo: call sever to make payment
        /*const {token, error} = await this.stripe.createToken(this.card);
        if (error) {
            this.error = error;
            console.log('Something is wrong:', error);
        } else {
            console.log('Success!', token);
            this.chargeCard(token.id);
        }*/

        // todo: client make the payment
        await this.stripe.confirmCardPayment((this.clientSecret), {
            payment_method: {
                card: this.card,
                billing_details: {
                    name: 'Fulei Huang'
                }
            }
        }).then((result) => {
            if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                console.log(result.error.message);
            } else {
                console.log('test');
                // Show a success message to your customer
                if (result.paymentIntent.status === 'succeeded') {
                    // There's a risk of the customer closing the window before callback
                    // execution. Set up a webhook or plugin to listen for the
                    // payment_in
                    // tent.succeeded event that handles any business critical
                    // post-payment actions.
                    this.saveCard();
                }
            }
        });
        // The payment has been processed!
        this.changeLoadingState(false);
        this.buttonDisabled = false;
    }

    /* ------- Post-payment helpers ------- */

    /* Shows a success / error message when the payment is complete */
    private orderComplete(clientSecret) {
        this.stripe.retrievePaymentIntent(clientSecret).then((result) => {
            var paymentIntent = result.paymentIntent;
            var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);

            document.querySelector(".sr-payment-form").classList.add("hidden");
            document.querySelector("pre").textContent = paymentIntentJson;

            document.querySelector(".sr-result").classList.remove("hidden");
            setTimeout(function () {
                document.querySelector(".sr-result").classList.add("expand");
            }, 200);

            this.changeLoadingState(false);
        });
    };

    private showError(errorMsgText) {
        this.changeLoadingState(false);
        var errorMsg = document.querySelector(".sr-field-error");
        errorMsg.textContent = errorMsgText;
        setTimeout(function () {
            errorMsg.textContent = "";
        }, 4000);
    };

// Show a spinner on payment submission
    private changeLoadingState(isLoading) {
        if (isLoading) {
            document.querySelector("button").disabled = true;
            document.querySelector("#spinner").classList.remove("hidden");
            document.querySelector("#button-text").classList.add("hidden");
        } else {
            document.querySelector("button").disabled = false;
            document.querySelector("#spinner").classList.add("hidden");
            document.querySelector("#button-text").classList.remove("hidden");
        }
    }

    private saveCard() {

    }

    private chargeCard(token: string) {
        const headers = new HttpHeaders({'token': token, 'amount': '10000'});
        this.http.post('/create-charge', {}, {headers: headers})
            .subscribe(resp => {
                console.log(resp);
                this.orderComplete(this.stripe.clientSecret)
            })
    }
}
