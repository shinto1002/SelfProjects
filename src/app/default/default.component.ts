import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  title = 'cred';
  myForm : FormGroup ;
  newval : any;
  editIndex : any;
  coordinates : any;
  wind : any;
  temp : any;
  pressure : any;
  weather : any;
  constructor(private fb:FormBuilder , private http:HttpClient){
    this.myForm = this.fb.group({
      nam : ['',[Validators.minLength(5),Validators.required]],
      check : [''],
      rad : ['',Validators.required],
      drop : ['',Validators.required],
      identify : [''],
      cityName : ['']
    })
  }
  ngOnInit(){
    this.newval = JSON.parse((localStorage.getItem("finalForm") || '[]'));
    // this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=80.1705809&appid=058a071f65834ebb92101ac0c877f675`).subscribe(res => {
    //   console.log(res);
    // })
  }
  save(){
    if(this.myForm.valid){
      let value = this.myForm.value;
      let arr;
      arr = JSON.parse((localStorage.getItem("finalForm") || '[]'));
      // if( )
      // this.myForm.controls['identify'].setValue(new Date().getTime());
      if( value.identify == ''){
      value.identify = new Date().getTime();
      arr.push(value);
      localStorage.setItem("finalForm",JSON.stringify(arr)) ;
      console.log('shinto');
      }
      else{
      console.log('else')
      arr.splice(this.editIndex,1);
      arr.push(value);
      // arr.sort((a:any ,b:any) => {b.identify-a.identify});
      localStorage.setItem("finalForm",JSON.stringify(arr)) ;
      }
      this.myForm.reset();
      this.newval = JSON.parse((localStorage.getItem("finalForm") || '[]'));
      this.newval.sort((a:any ,b:any) => {b.identify-a.identify});
      this.myForm.controls['identify'].setValue('');
    }
  }
  del(i : any){
    console.log(i);
    this.newval.splice(i,1);
    localStorage.setItem("finalForm",JSON.stringify(this.newval));
  }
  edit(i : any, item : any){
    this.myForm.controls['nam'].setValue(item.nam);
    this.myForm.controls['check'].setValue(item.check);
    this.myForm.controls['rad'].setValue(item.rad);
    this.myForm.controls['drop'].setValue(item.drop);
    this.myForm.controls['identify'].setValue(item.identify);
    this.editIndex = i;
  }



}
