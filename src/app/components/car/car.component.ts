import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarApiService } from 'src/app/services/car-api.service';
import { ICar } from 'src/app/interfaces/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  @Input() carData: ICar | any;
  carImageWidth: number = 300;
  @Output() carDeleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() carEdited: EventEmitter<ICar> = new EventEmitter<ICar>();

  editing: boolean = false;

  constructor(private _carAPIService: CarApiService) {}

  deleteCar(carId: string) {
    this.carDeleted.emit(carId);
  }
  

  toggleEdit() {
    this.editing = !this.editing;
  }

  updateCar(make: string, model: string, year: string, imageUrl: string) {
    const updatedCar: ICar = {
      _id: this.carData._id,
      make: make,
      model: model,
      year: year,
      imageURL: imageUrl
    };
  
    this._carAPIService.updateCarDetails(updatedCar).subscribe(result => {
      console.log('Car updated:', result);
      this.carEdited.emit(updatedCar);
      this.editing = false;
    });
  }
  
}
