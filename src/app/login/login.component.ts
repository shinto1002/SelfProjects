import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @Input("shinto") recieved : any ;
  output : any;
  userForm : FormGroup;
  constructor(private http:HttpClient , private fb:FormBuilder , private router:Router) { 
    this.userForm=this.fb.group({
      userName : [''],
      password : ['']
    });

  }

  ngOnInit(): void {
  }

  submit(){
    // this.http.get("./assets/users.JSON").subscribe(result => {
      let result = JSON.parse(localStorage.getItem("userList") || '[]');
      this.output = result;
      // console.log(this.output);
      // console.log(this.output);
      // console.log(this.userForm.value,"asdasdasdasdsad")
      let userNameform = this.userForm.value;
      userNameform.userName = userNameform.userName.toLowerCase();
      // console.log(userNameform);
      let userNametemp =userNameform.userName;
      let userPassword = userNameform.password;
      let filteredResults = this.output.filter((filtered:any) => {
        // console.log(userNametemp,filtered.username);
        return userNametemp === filtered.username
      });
      console.log(filteredResults.length);
      if(filteredResults.length != 0){
      console.log("first if");
      if(filteredResults[0]['password'] === userPassword){
        let finalFilter = filteredResults[0];
        delete finalFilter.password;
        sessionStorage.setItem("toSend" ,JSON.stringify(finalFilter));
        this.router.navigate(['/weather']);
      }
      else{
        alert("Password incorrect")
      }
    }else{
      alert("user name incorrect")
    }
    this.userForm.reset();
      // });

  }

}
