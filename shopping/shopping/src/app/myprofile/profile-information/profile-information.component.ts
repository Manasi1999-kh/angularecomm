import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { EditComponent } from '../edit/edit.component';
import { UploadImageComponent } from '../upload-image/upload-image.component';
@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {
  hide:boolean = true
  profileForm: FormGroup;
  constructor(private fb: FormBuilder,public dialog: MatDialog
    ,public loginService:LoginService) { 
      this.loginService.getUser()
    }

  ngOnInit() {
  //   this.profileForm = this.fb.group({
  //     firstName: [''],
  //     lastName: [''],
  //     gender: [],
  //     mobile: [],
  //     email: []
  //   });
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadImageComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditDialog(){
    const dialogRef = this.dialog.open(EditComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
