import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SubSink} from "subsink";
import {User} from "../../shared/model/user";
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    userInfo: User;
    private subs = new SubSink();
    uppercaseExp = '^(?=.*[A-Z]).+$';
    lowercaseExp = '^(?=.*[a-z]).+$';
    numberExp = '^(?=.*[0-9]).+$';
    specialCharExp = '^(?=.*[!@#$%^&*()_+}{|":?></.,\';=-]).+$';
    signupForm: FormGroup;
    public error: string;

    constructor(private fb: FormBuilder,
                private userService: UserService,
                private route: Router,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        console.log('init sign up component');
        this.signupForm = this.fb.group({
            username: ['', [Validators.required, Validators.maxLength(20)]],
            email: ['', [Validators.email, Validators.maxLength(25)]],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(25),
                    uppercaseValidator(new RegExp(this.uppercaseExp)),
                    lowercaseValidator(new RegExp(this.lowercaseExp)),
                    numberValidator(new RegExp(this.numberExp)),
                    specialCharValidator(new RegExp(this.specialCharExp)),
                ]
            ],
            confirmPass: ['', Validators.required]
        }, {validator: confirmPassword('password', 'confirmPass')});
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
            panelClass: ['red-snackbar']
        });
    }

    onSubmit() {
        this.userInfo = new User();
        /*this.userInfo.username = this.username.value;
        this.userInfo.password = this.password.value;
        this.userInfo.email = this.email.value;*/
        this.userService.signUpUser(this.userInfo).subscribe((data: any) => {
                this.route.navigate(['/login']);
            },
            // todo: error handling
            (response) => {
            console.log(response);
            this.error = response.error.message;
            });
    }

    get username() {
        return this.signupForm.get('username');
    }

    get password() {
        return this.signupForm.get('password');
    }

    get email() {
        return this.signupForm.get('email');
    }

    get confirmPass() {
        return this.signupForm.get('confirmPass');
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

}

export function uppercaseValidator(exp: RegExp): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        const positive = exp.test(control.value);
        return positive ? null : {noUppercase: {value: control.value}};
    };
}

export function lowercaseValidator(exp: RegExp): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        const positive = exp.test(control.value);
        return positive ? null : {noLowercase: {value: control.value}};
    };
}

export function numberValidator(exp: RegExp): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        const positive = exp.test(control.value);
        return positive ? null : {noNumber: {value: control.value}};
    };
}

export function specialCharValidator(exp: RegExp): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        const positive = exp.test(control.value);
        return positive ? null : {noSpecialChar: {value: control.value}};
    };
}

export function confirmPassword(passControlName: string, confirmPassControlName: string) {
    return (formGroup: FormGroup) => {
        const passControl = formGroup.controls[passControlName];
        const confirmPassControl = formGroup.controls[confirmPassControlName];

        if (confirmPassControl.errors && !confirmPassControl.errors.notMach) {
            return;
        }

        if (passControl.value !== confirmPassControl.value) {
            confirmPassControl.setErrors({notMatch: true});
        } else {
            confirmPassControl.setErrors(null);
        }
    };
}



