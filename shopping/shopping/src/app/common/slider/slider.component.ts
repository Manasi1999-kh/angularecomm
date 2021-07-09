import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/Ilogin';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  carouselOptions = 
    {
      items: 1, 
      dots: true, 
      navigation: false, 
      loop:true,
      margin:10,
      autoplay:true,
      animateOut: 'fadeOut',
      autoHeight: true,
      autoHeightClass: 'owl-height',
      
  }
  
 
  images = [
    
    
    {
      text: "Festive Deer",
      image: "https://image.freepik.com/free-photo/woman-wearing-mask-holding-shopping-bags_23-2148886988.jpg"
    },
    {
      text: "Festive Deer",
      image: "https://image.freepik.com/free-photo/portrait-beautiful-young-asian-woman-use-computer-laptop-credit-card-online-shopping-sofa-living-room-interior_74190-12821.jpg"
    },
    {
      text: "Festive Deer",
      image: "https://image.freepik.com/free-photo/smiley-woman-holding-shopping-bags-pointing-possible-store-sale_23-2148673277.jpg"
    },
    {
      text: "Festive Deer",
      image: "https://image.freepik.com/free-photo/this-is-same-shoes_329181-1769.jpg"
    }
  ];
 
  constructor() { }

  ngOnInit() {
  }


}
