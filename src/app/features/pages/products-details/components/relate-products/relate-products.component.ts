import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductCardComponent } from "../../../../../shared/components/ui/product-card/product-card.component";

@Component({
  selector: 'Eco-relate-products',
  imports: [CarouselModule, ProductCardComponent],
  templateUrl: './relate-products.component.html',
  styleUrl: './relate-products.component.css'
})
export class RelateProductsComponent {


  @Input({ required: true }) Products!: Product[]
  @Input({ required: true }) Title!: string

  customOptions: OwlOptions = {
    margin: 16,
    
    autoplay: true,
    autoplayHoverPause: true,
    smartSpeed: 800,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: true,
    navText:
      ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'], // or use custom icons:
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  };





}
