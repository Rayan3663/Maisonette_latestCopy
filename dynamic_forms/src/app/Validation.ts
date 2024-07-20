import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Error messages
export const validationMessages = {
  userId: {
    required: 'User ID is required',
    invalidEmail: 'Invalid email address',
    maxLength: 'User ID must be less than 50 characters'
  },
  password: {
    required: 'Password is required',
    invalidPassword: 'Password must be at least 8 characters long and contain both letters and numbers',
    minLength: 'Password must be at least 8 characters long',
    maxLength: 'Password must be less than 20 characters'
  }
};

// Email validator
export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegEx.test(control.value) ? null : { invalidEmail: true };
};

// Password validator
export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegEx.test(control.value) ? null : { invalidPassword: true };
};

// Min length validator
export const minLengthValidator = (minLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && control.value.length >= minLength ? null : { minLength: { requiredLength: minLength, actualLength: control.value ? control.value.length : 0 } };
  };
};

// Max length validator
export const maxLengthValidator = (maxLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && control.value.length <= maxLength ? null : { maxLength: { requiredLength: maxLength, actualLength: control.value ? control.value.length : 0 } };
  };
};
