import {FormControl} from "@angular/forms";

const EMAIL_REGEXP: RegExp = new RegExp(/\S+@\S@.\S@/);
// >const EMAIL_REGEXP: RegExp = new RegExp([
// >  "/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"",
// >  "(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*",
// >  "\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
// >  "|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?",
// >  "|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/",
// >].join(""));

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
