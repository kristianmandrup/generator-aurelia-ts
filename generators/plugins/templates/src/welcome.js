import {computedFrom} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';

@inject(Validation)
export class Welcome{
  constructor(validation){
    this.heading = 'Welcome to the Aurelia Navigation App!';
    this.firstName = 'John';
    this.lastName = 'Doe';

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

  //Getters can't be observed with Object.observe, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below.
  //@computedFrom('firstName', 'lastName')
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  welcome(){
    this.validation.validate() //the validate will fulfil when validation is valid, and reject if not
      .then( () => {
        alert(`Welcome, ${this.fullName}! `);
      });
  }
}

export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
