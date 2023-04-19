import { Component, OnInit } from '@angular/core';
import { CarApiService } from 'src/app/services/car-api.service';
import { ICar } from 'src/app/interfaces/car';
import { NewCar } from 'src/app/interfaces/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  carsData: ICar | any;
  show: any;

  constructor(private _carAPIService: CarApiService) { }

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this._carAPIService.getCarDetails().subscribe((carsData: ICar[]) => {
      this.carsData = carsData;
    }, (error) => {
      console.error("Error fetching cars data: ", error);
    });
  }
  

  addCar(make: string, model: string, year: string, imageUrl: string): boolean {
    let addCar: ICar;
    addCar = new NewCar(make, model, year, imageUrl);
    this._carAPIService.addCarDetails(addCar).subscribe((newCar: ICar) => {
      this.carsData.push(newCar);
      this.getCars();
    });
  
    return false;
  }

  onDeleteCar(carId: string): boolean {
    console.log(carId);
    this.deleteCar(carId);
    return false;
  }

  
  deleteCar(carId: string): void {
    this._carAPIService.delCarDetails(carId).subscribe(result => {
      console.log(result);
      // Update the carsData array only after a successful deletion
      this.carsData = this.carsData.filter((car: ICar) => car._id !== carId);
    });
  }
  

  onEditCar(updatedCar: ICar): void {
    const index = this.carsData.findIndex((car: ICar) => car._id === updatedCar._id);
    if (index !== -1) {
      this.carsData[index] = updatedCar;
    }
  }
}
