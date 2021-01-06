import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input()
  movies: Movie[] = [];
  public urlImgTmdb = 'http://image.tmdb.org/t/p/w500';
  public mySwipper: Swiper;

  constructor() { }
  
  ngAfterViewInit(): void {
    this.mySwipper = new Swiper('.swiper-container', {
      loop: true,
    });
  }

  ngOnInit(): void {
  }

  onSlideNext(){
    this.mySwipper.slideNext();
  }

  onSlidePrev(){
    this.mySwipper.slidePrev()
  }

}
// 'background-image': 'url(http://image.tmdb.org/t/p/w500/jeAQdDX9nguP6YOX6QSWKDPkbBo.jpg)'