import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

name : any;
myForm : FormGroup ;
coordinates : any;
wind : any;
temp : any;
pressure : any;
weather : any;
forecast : any;
cityNameDisplay : any;
constructor(private fb:FormBuilder , private http:HttpClient){
  this.myForm = this.fb.group({
    cityName : ['']
  })
}

  ngOnInit(): void {
    let importedData = JSON.parse(sessionStorage.getItem("toSend") ||'');
    console.log(importedData);
    this.name = importedData.name; 
  }
  check(){
    let city = this.myForm.value;
    this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city.cityName}&limit=1&appid=cb28359d11882f26fcbd68a5492beb35`).subscribe(res => {
    console.log(res);
    this.cityNameDisplay = city.cityName;
    this.coordinates=res;
    if(this.coordinates.length != 0){
        this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.coordinates[0]['lat']}&lon=${this.coordinates[0]['lon']}&appid=cb28359d11882f26fcbd68a5492beb35`).subscribe(result => {
        console.log(result);
        this.weather=result;
        this.temp = this.weather['main']['temp'] - 273.15;
        this.pressure = this.weather['main']['pressure'];
        this.wind = this.weather['wind']['speed'];
        this.forecast = this.weather['weather']['0']['description'];
        console.log(this.forecast);
        });
    }else{
      alert("The city name is invalid");
      return;
    }

    });
  }

}
