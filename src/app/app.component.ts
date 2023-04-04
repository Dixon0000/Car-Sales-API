import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carsales-nosql';

  onAddCar(event: any) {
    console.log('Car added:', event);
  }
}
