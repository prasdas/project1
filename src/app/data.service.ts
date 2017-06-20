import { Injectable } from '@angular/core';

@Injectable()

export class DataService {

  constructor() { }

  cars = [
    'Chevrolet', 'Ford', 'Toyota', 'Buick'
  ];

  myData(){
    return 'This is my data';
  }

}
