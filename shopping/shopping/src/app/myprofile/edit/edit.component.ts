import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
   
constructor(public loginService:LoginService) { 
    this.loginService.getUser();
  }

  ngOnInit() {
  }

  submitAdd(f:NgForm){
    console.log(f.value);
    this.loginService.upDateDetails(f.value);
    this.loginService.getUser();
  }
}
