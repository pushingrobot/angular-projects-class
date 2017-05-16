import {FormControl} from "@angular/forms";

// Borrowed from http://emailregex.com
// tslint:disable-next-line
const EMAIL_REGEXP: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export interface IEmailValidation {
  validateEmail: {
    valid: boolean;
  };
}

/**
 * TODO
 */
export class CustomValidators {
  /**
   * sample from http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
   */
  public static validateEmail(c: FormControl): undefined|IEmailValidation {
    if (EMAIL_REGEXP.test(c.value as string)) {
      return undefined;
    } else {
      return {
        validateEmail: {
          valid: false,
        },
      };
    }
  }
}
