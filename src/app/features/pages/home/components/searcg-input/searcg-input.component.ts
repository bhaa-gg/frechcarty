import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { CategoryService } from '../../../../../shared/services/category/category.service';
import { BrandService } from '../../../../../shared/services/brand/brand.service';
import { Product } from '../../../../../shared/interfaces/product';
import { Brand } from '../../../../../shared/interfaces/Brand';
import { Category } from '../../../../../shared/interfaces/category';

@Component({
  selector: 'Eco-searcg-input',
  imports: [],
  templateUrl: './searcg-input.component.html',
  styleUrl: './searcg-input.component.css'
})
export class SearcgInputComponent implements OnInit {


  private readonly _categories = inject(CategoryService)
  private readonly _Brands = inject(BrandService)
  private readonly _productService = inject(ProductService)
  filteredProducts: Product[] = []
  filteredBrands: Brand[] = []
  filteredCategories: Category[] = []


  ngOnInit(): void {
    this.getProducts()
  }
  search(value: Event) {
    const target = value.target as HTMLInputElement
    const val = target.value
    if (!val.trim() && val.length > 2) return
    this.getProductsData(val.trim())
    this.getBrandsData(val.trim())
    this.getCategoriesData(val.trim())
  }




  getProductsData(value: string) {
  }
  getBrandsData(value: string) {
  }
  getCategoriesData(value: string) {
  }


  getProducts() {
    this._productService.getProducts({}).subscribe({
      next: (res) => {
        console.log(res);
        this.filteredProducts = res.data
      },
      error(err) {
        console.log(err);
      },
      complete() {
      },
    })
    this._categories.getCategories().subscribe({
      next: (res) => {
        this.filteredCategories = res.data;
      }
    })
    this._Brands.getBrands().subscribe({
      next: (res) => {
        this.filteredBrands = res.data
      }
    })

  }


}
