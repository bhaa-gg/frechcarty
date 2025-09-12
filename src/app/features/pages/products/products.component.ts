import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCardSkeletonComponent } from "../../../shared/components/ui/product-card-skeleton/product-card-skeleton.component";
import { ProductCardComponent } from "../../../shared/components/ui/product-card/product-card.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../shared/services/Wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../shared/interfaces/product';
import { BrandService } from '../../../shared/services/brand/brand.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Category } from '../../../shared/interfaces/category';
import { Brand } from '../../../shared/interfaces/Brand';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Eco-products',
  imports: [ProductCardSkeletonComponent, ProductCardComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  private readonly _productService = inject(ProductService)
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _toaster = inject(ToastrService)
  private readonly _cartService = inject(CartService)
  private readonly _wishlistService = inject(WishlistService)
  private readonly _brandService = inject(BrandService)
  private readonly _categoryService = inject(CategoryService)



  metaData !: { currentPage: number, limit: number, nextPage: number, numberOfPages: number[] }
  products !: Product[]
  loadingBtn: string = ''
  CateId!: string
  loadingBtnWish: string = ''
  cartIds!: string[]
  wishlistIds!: string[]
  loading: boolean = true
  categories !: Category[]
  brands !: Brand[]

  ngOnInit(): void {
    this.getBrandsAndCategories()

    this._activatedRoute.queryParams.subscribe((params) => {
      this.getProducts({ limit: 12, ...params })
      this.CateId = params['category'] || ''
    })
    this.getItemInCart()
    this.getWishlistItems()
  }

  getBrandsAndCategories() {
    this._brandService.getBrands().subscribe({
      next: (res) => {
        this.brands = res.data
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      }
    })
    this._categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      }
    })
  }
  getProducts(params: any) {
    this.loading = true
    return this._productService.getProductsParams(params).subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data
        this.metaData = {
          ...res.metadata,
          numberOfPages: Array.from({ length: res.metadata.numberOfPages }, (_, i) => i + 1)
        }

        console.log(this.metaData);

        this.loading = false
      },
      error: (err) => {
        console.log(err);
        this.loading = false
      },
      complete: () => {
        console.log('complete');
        this.loading = false
      }
    })
  }
  makeNewQueryParams(key: string, value: string | null) {
    const currentParams = { ...this._activatedRoute.snapshot.queryParams };
    if (value === null || value === undefined || value === '') {
      delete currentParams[key];
    } else {
      currentParams[key] = value;
    }

    console.log(key);
    console.log(currentParams);

    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: currentParams,
    });
  }

  getItemInCart() {
    this._cartService.cart$.subscribe({
      next: (res) => {
        this.cartIds = res.data.products.map((item: any) => item.product._id || item.product)
        console.log({ cartIds: this.cartIds });
      }
    })
  }

  getWishlistItems() {
    this._wishlistService.WhishListData.subscribe({
      next: (res) => {
        this.wishlistIds = res
      }
    })
  }

  addToCart(id: string) {
    this.loadingBtn = id
    this._cartService.addProductToCart2(id).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.loadingBtn = ''
          this._toaster.success(res.message, '', {
            messageClass: 'text-sm font-semibold ',
          });
        },
        error: (err) => {
          this.loadingBtn = ''
          console.log(err);
        },
        complete: () => {
          this.loadingBtn = ''
        }
      }
    )
  }

  removeProductFromCart(id: string) {
    this.loadingBtn = id
    this._cartService.deleteProductFromCart2(id).subscribe(
      {
        next: (res) => {
          this.loadingBtn = ''
          this._toaster.info("Product removed from cart", '', {
            messageClass: 'text-sm font-semibold ',
          });
        },
        error: (err) => {
          this.loadingBtn = ''
          console.log(err);
        },
        complete: () => {
          this.loadingBtn = ''
        }
      }
    )
  }

  addToWishlist(id: string) {
    this.loadingBtnWish = id + ''
    this._wishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        this.loadingBtnWish = ''
      },
      error: (err) => {
        console.log(err);
        this.loadingBtnWish = ''
      },
      complete: () => {
        this.loadingBtnWish = ''
      },
    })
  }
  delFromWishlist(id: string) {
    this.loadingBtnWish = id + ''
    this._wishlistService.removeFromWishlist(id).subscribe({
      next: (value) => {
        this.loadingBtnWish = ''
      }, error: (err) => {
        console.log(err);
        this.loadingBtnWish = ''
      },
      complete: () => {
        this.loadingBtnWish = ''
      },
    })
  }
  makeC(e: Event, key: string) {
    const target = e.target as HTMLSelectElement
    this.makeNewQueryParams(key, target.value)
  }
  getAllProducts() {
    this.makeNewQueryParams('category', null)
  }

  clearAllParams() {
    this._router.navigate([], {
      queryParams: {}, // empty params
      replaceUrl: true, // optional: replace instead of pushing history
    });
  }
}
