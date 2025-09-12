import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../shared/services/category/category.service';
import { Category } from '../../../../../shared/interfaces/category';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from "../../../../../shared/components/ui/loading/loading.component";

@Component({
  selector: 'Eco-popular-categories',
  imports: [CarouselModule, LoadingComponent],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent implements OnInit {

  private readonly _categoryService = inject(CategoryService)
  private readonly _router = inject(Router)


  loading: boolean = false
  categories !: Category[]

  customOptions: OwlOptions = {
    loop: true,
    margin: 16,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    // navText:false,
    // ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'], // or use custom icons:
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



  getCategories() {
    this.loading = true
    this._categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data
        this.loading = false
      },
      error: (err) => {
        console.log(err);
        this.loading = false
      },
      complete: () => {
        this.loading = false
      },
    })
  }
  ngOnInit(): void {
    this.getCategories()
  }
  selectCategory(id: string): void {
    this._router.navigate(['/products'], { queryParams: { category: id } })
  }
}
