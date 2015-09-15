/// <reference path="../typings/tsd.d.ts" />

import {computedFrom} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';

export class Welcome{
  static inject() { return [Validation]; }

  constructor(validation){
    this.heading = 'Welcome to the Aurelia Navigation App!';
    this.firstName = 'John';
    this.lastName = 'Doe';

    // TODO: add validation to form
    // <form role="form" submit.delegate="welcome()" validate.bind="validation" >
    this.validation = validation.on(this)
        .ensure('firstName')
              .isNotEmpty()
              .hasMinLength(3)
              .hasMaxLength(10)
        .ensure('lastName')
              .isNotEmpty()
              .hasMinLength(3)
              .hasMaxLength(10) ;
  }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    welcome() {
        alert("Welcome, " + this.fullName + "!");
    }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
