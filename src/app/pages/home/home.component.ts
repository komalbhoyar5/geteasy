import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
// import { GeneralsettingsService } from '../../_services/index';
import { environment } from '../../../environments/environment';
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
private API_URL= environment.API_URL;
  apiLink : any ={};
  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;
  constructor(
    ) {
     }
  ngOnInit() {
      // category slider
      this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      console.log(this.API_URL);
      this.carouselTile = {
        grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
        slide: 2,
        speed: 400,
        animation: 'lazy',
        interval: 200,
        point: {
          visible: false
        },
        load: 2,
        touch: true,
        easing: 'ease'
      }

      if(jQuery('#home-slider').length >0 && jQuery('#contenhomeslider').length >0){
            var slider = jQuery('#contenhomeslider').bxSlider(
                {
                    nextText:'<i class="fa fa-angle-right"></i>',
                    prevText:'<i class="fa fa-angle-left"></i>',
                    auto: true,
                }

            );
        }
	}


}
