import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { CategoryService } from '../../../../../shared/services/category/category.service';
import { BrandService } from '../../../../../shared/services/brand/brand.service';
import { Product } from '../../../../../shared/interfaces/product';
import { Brand } from '../../../../../shared/interfaces/Brand';
import { Category } from '../../../../../shared/interfaces/category';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'Eco-searcg-input',
  imports: [RouterLink],
  templateUrl: './searcg-input.component.html',
  styleUrl: './searcg-input.component.css'
})
export class SearcgInputComponent implements OnInit {


  private readonly _categories = inject(CategoryService)
  private readonly _Brands = inject(BrandService)
  private readonly _router = inject(Router)
  private readonly _productService = inject(ProductService)
  filteredProducts: Product[] = []
  filteredBrands: Brand[] = []
  filteredCategories: Category[] = []

  finalProducts: any[] = []
  finalBrands: any[] = []
  finalCategories: any[] = []

  ngOnInit(): void {
    this.getProducts()
  }
  search(value: Event) {
    const target = value.target as HTMLInputElement
    const val = target.value
    if (!val.trim()) {
      this.finalProducts = []
      this.finalBrands = []
      this.finalCategories = []
      return
    }
    this.getProductsData(val.trim())
  }

  navToProducts(id: string, from: string) {
    this._router.navigate([`/products`], {
      queryParams: { [from]: id }
    })

  }



  getProductsData(value: string) {
    this.finalProducts = this.filteredProducts
      .filter(product => product.title.toLowerCase().includes(value.toLowerCase()))

    this.finalCategories = this.filteredCategories
      .filter(c => c.name.toLowerCase().includes(value.toLowerCase()))

    this.finalBrands = this.filteredBrands
      .filter(b => b.name.toLowerCase().includes(value.toLowerCase()))


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


  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    console.log("asdjsakld");
    this.finalProducts = []
    this.finalBrands = []
    this.finalCategories = []
  }
}
