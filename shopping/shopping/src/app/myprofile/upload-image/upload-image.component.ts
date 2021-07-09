import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  form:FormGroup
  imageData:string;
  constructor(public loginService:LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      image:new FormControl(null)
    })
  }

  selectFile(event:Event){
    console.log(event)
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file})
    const allowType = ["image/png" , "image/jpeg" , "image/jpg"];
    if(file && allowType.includes(file.type)){
      const reader = new FileReader();
      // console.log(reader);
      reader.onload = () =>{
        this.imageData = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }



  submit(){
    console.log(this.form.value.image);
    this.loginService.uploadImage(this.form.value.image).subscribe((res)=>{
      console.log(res);
      this.loginService.getUser();
    } , (err)=>{
      console.log(err);
      this.loginService.getUser();
    })
   
  }

}
