/// <reference path="../typings/tsd.d.ts" />
// import {Behavior} from "aurelia-framework";
import {Decorators} from 'aurelia-framework';


export class NavBar {
  // @bindable('one')
    // static inject = [Behavior];
    // static metadata = Behavior.withProperty("router");
  static decorators = Decorators.bindable('router');
}
