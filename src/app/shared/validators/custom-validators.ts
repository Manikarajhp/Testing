import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const checkControl = group.get(checkControlName);

      if (!control || !checkControl) {
        return null;
      }

      if (checkControl.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control.value !== checkControl.value) {
        checkControl.setErrors({ matching: true });
        return { matching: true };
      } else {
        checkControl.setErrors(null);
        return null;
      }
    };
  }

  static passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && value.length >= 8;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  static eMailCom() : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      if(!value) return null;

      return !(value.slice(-4) === ".com") ? {eMailCom: true} : null;

    };
  }
}
