import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function CapitalLetter() : ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const passwordValid = hasUpperCase;

    return !passwordValid ? {oneCapitalLetter: true} : null;
  };
}
