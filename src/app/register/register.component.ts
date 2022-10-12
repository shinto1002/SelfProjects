import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: [''],
      name: [''],
      password: [''],
      age: [''],
      dob: [''],
      contact: [''],
      email: ['']
    })
  }

  ngOnInit(): void {
  }

  register() {
    let registerValues = this.registerForm.value;
    let savedValues = JSON.parse(localStorage.getItem("userList") || '[]');
    console.log(registerValues, savedValues);
    if (savedValues.length != 0) {
      let checkUserName = savedValues.filter((filtered: any) => {
        console.log(filtered);
        console.log(registerValues.username,filtered.username);
        return registerValues.username === filtered.username;
      });
      console.log("check", checkUserName);
      if (checkUserName.length != 0) {
        alert("User name already exists");
        return;
      }
    }
    registerValues.username = registerValues.username.toLowerCase();
    savedValues.push(registerValues);
    localStorage.setItem("userList", JSON.stringify(savedValues));
    this.registerForm.reset();
    this.router.navigate(['/login']);

  }
}
