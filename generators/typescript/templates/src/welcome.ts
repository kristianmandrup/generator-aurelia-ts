/// <reference path="../typings/tsd.d.ts" />

export class Welcome {
    public heading: string;
    public firstName: string;
    public lastName: string;

    constructor() {
        this.heading = "Welcome to the Aurelia Typescript skeleton app!";
        this.firstName = "John";
        this.lastName = "Doe";
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
