import { Component, inject, OnInit } from '@angular/core';
import { RecentProductsComponent } from "./components/recent-products/recent-products.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { LoadingComponent } from '../../../shared/components/ui/loading/loading.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Category } from '../../../shared/interfaces/category';
import { CategoryElementComponent } from "./components/category-element/category-element.component";

@Component({
  selector: 'Eco-home',
  imports: [CarouselModule, CommonModule, RecentProductsComponent, PopularCategoriesComponent, MainSliderComponent, LoadingComponent, CategoryElementComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {


}
