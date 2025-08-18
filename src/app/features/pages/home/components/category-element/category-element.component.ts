import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../../../shared/interfaces/category';
import { CategoryService } from '../../../../../shared/services/category/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'Eco-category-element',
  imports: [CarouselModule, CommonModule],
  templateUrl: './category-element.component.html',
  styleUrl: './category-element.component.css'
})
export class CategoryElementComponent implements OnInit {
  private readonly _categories = inject(CategoryService)
  categories !: Category[]
  SupCategoriesData: any[] = []
  private readonly _toaster = inject(ToastrService)
  private readonly _router = inject(Router)
  imgCate!: string
  customOptions: OwlOptions = {
    margin: 10,
    autoplayHoverPause: true,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 3
      },
      600: {
        items: 5
      },
      1000: {
        items: 8
      }
    }
  }

  ngOnInit(): void {
    this._categories.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      }
    })
  }
  getSupCateg(id: string) {
    this._categories.getCategoriesSubCategories(id).subscribe({
      next: (res) => {
        !res.data.length ?
          this._toaster.error('No Sup Categories Found', 'Error', { timeOut: 3000 }) :
          this.SupCategoriesData = res.data
      }
    })
  }
  show(id: string) {
    this.imgCate = this.categories.find(cat => cat._id === id)?.image || ''
    this.getSupCateg(id)
  }
  hide() {
    this.SupCategoriesData = []
    this.imgCate = ''
  }
  ProdNavigate(id: string) {
    this._router.navigate(['products'], { queryParams: { category: id } })
  }

}
