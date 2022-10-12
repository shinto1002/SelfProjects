import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.scss']
})
export class FirstpageComponent implements OnInit {
  // shinto = "Hi" ;

  constructor( private router : Router) { 
    
  }

  ngOnInit(): void {
  }
  login(){
      this.router.navigate(['/login']);
  }
  register(){
    this.router.navigate(['/register']);
  }

}
