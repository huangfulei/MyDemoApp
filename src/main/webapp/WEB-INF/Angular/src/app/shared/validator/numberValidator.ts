import {AbstractControl, ValidatorFn} from '@angular/forms';

export function numberValidator(exp: RegExp): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const positive = exp.test(control.value);
    return positive ? null : {notOnlyNumber: {value: control.value}};
  };
}
