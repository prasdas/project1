import { Component } from '@angular/core';
import { DataService } from './data.service';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',

  //Define External Templating
  //templateUrl: './app.component.html',
  
  //Define Inline Templating
  template: `
  <h1>Hey Guys!!!!!</h1>
  <p>How are you doing?</p>

  <p>{{myObject.location}}</p>

  <ul>
    <li *ngFor = "let arr of myArr">{{ arr }}</li>
  </ul>

  <b *ngIf="myArr">Yeah, I exist.</b>
  <b *ngIf="!myArr">Yes, I exist.</b>
  <p>
    <i *ngIf="myString == 'something'">Hi</i>
    <i *ngIf="myString != 'nothing'">Hello</i>
  </p>

  <!-- otherTmpl -> local template property/variable -->
  <b *ngIf="myString == 'nothing'; else otherTmpl">Yeah, I exist.</b>
  <ng-template #otherTmpl>No, I do not exist.</ng-template> 
  <br/>

  <div *ngIf="myString == 'something'; then tmpl1 else tmpl2"></div>
  <br/>
  <div *ngIf="myString != 'something'; then tmpl1 else tmpl2"></div>
  <ng-template #tmpl1>Truth</ng-template>
  <ng-template #tmpl2>False</ng-template>

  <!-- property binding -->
  <p>    
    <img src="{{ angularLogo }}">
    <img [src]="angularLogo">
    <img bind-src="angularLogo">
  </p>
  <p><button [disabled]="buttonStatus1">My Button</button></p>
  <p><button [disabled]="buttonStatus2 != 'enabled'">My Button</button></p>

  <!-- Event binding -->
  <p><button (click)="myEvent($event)">Click Me</button></p>
  <p><button (mouseenter)="myEvent($event)">Mouse Enter</button></p>

  <!-- Class Binding -->
  <h1 [class]="titleClass1">My Styles</h1>
  <h1 [class.blue-title]="titleClass2">My Styles</h1>
  <h1 [ngClass]="titleClasses">My Styles</h1>

  <!-- Style Binding -->
  <h1 [style.color]="titleStyle1">My Styles</h1>
  <h1 [style.color]="titleStyle2 ? 'yellow' : 'pink'">My Styles</h1>
  <h1 [ngStyle]="titleStyles">My Styles</h1>

  <!-- Service Binding --> 
  <p>{{ someProperty }}</p>

  <!-- Add animation -->
  <!-- state is an expression , which is defined as a property within component class -->
  <p [class]="animationClass" [@myAwesomeAnimation]='state' (click)="animateMe()">I will animate</p>
  `,

  // Defining External Stylesheets
  //styleUrls: ['./app.component.css'],

  // Defining Inline Stylesheets
  styles: [`
      h1{
        text-decoration:underline;
        color:#FF0000;
      }
      .blue-title{
        color: blue;
      }
      .large-title{
        font-size:4em;
      }

      .animation{
        width:200px;
        background:lightgray;
        margin: 100px auto;
        text-align:center;
        padding:20px;
        font-size:1.5em;
      }
  `],

  // Defining Animations
  animations: [
      trigger('myAwesomeAnimation',[

          state('small', style({
              transform: 'scale(1)',
          })),
          state('large', style({
              transform: 'scale(1.2)',
          })),

          // => one direction <=> both direction
          /*transition('small <=> large', animate('300ms ease-in', style({
              transform: 'translateY(40px)'
          }))),*/

          transition('small <=> large', animate('5000ms ease-in', keyframes([
              style({opacity:0, transform:'translateY(-75%)', offset: 0}),
              style({opacity:1, transform:'translateX(50px)', offset: .2}),
              style({opacity:1, transform:'translateY(50px)', offset: .4}),
              style({opacity:1, transform:'translateX(-50px)', offset: .6}),
              style({opacity:1, transform:'translateY(-50px)', offset: .8}),
              style({opacity:1, transform:'translateY(0)', offset: 1}),
          ]))),
      ]),
  ]
})
export class AppComponent {
  title = 'app';
  myObject = {
    gender: 'male',
    age: 32,
    location: 'India'
  }
  myArr = ['him','her','yours'];
  myString = 'something';

  //property binding
  angularLogo = "https://angular.io/assets/images/logos/angular/angular.png";
  buttonStatus1 = true;
  buttonStatus2 = 'enabled';

  //Class Binding
  titleClass1 = 'blue-title';
  titleClass2 = false;
  titleClasses = {
    'blue-title':false,
    'large-title':true
  }
  animationClass = 'animation';

  //Style Binding
  titleStyle1 = 'purple';
  titleStyle2 = false;
  titleStyles = {
    'color':'indigo',
    'font-size':'4em'
  }

  //Event Binding
  myEvent(event){
    console.log(event);
  }

  // Services
  constructor(private dataService:DataService){

  }

  someProperty:string = '';

  ngOnInit(){ //lifecycle hooking, the code within it run at the time of component loads
    console.log(this.dataService.cars);

    this.someProperty = this.dataService.myData();
  }

  // Animation Property Binding
  state:string = 'small';

  animateMe(){
      this.state = (this.state === 'small' ? 'large' : 'small');
  }

  
}
