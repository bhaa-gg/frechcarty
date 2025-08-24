import { Routes } from '@angular/router';
import { AuthComponent } from './core/layouts/auth/auth.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedUserGuard } from './core/guards/auth/loged-user.guard';

export const routes: Routes = [
    {
        path: "auth",
        component: AuthComponent,
        canActivateChild: [logedUserGuard],
        children: [
            {
                path: "",
                redirectTo: "register",
                pathMatch: "full"
            },
            {
                path: "login",
                loadComponent: () => import("./core/pages/login/login.component").then(m => m.LoginComponent)
            },
            {
                path: "register",
                loadComponent: () => import("./core/pages/register/register.component").then(m => m.RegisterComponent)

            },
            {
                path: "forget",
                loadComponent: () => import("./core/pages/forget/forget.component").then(m => m.ForgetComponent)
            }
        ]
    },
    {
        path: "",
        redirectTo: "auth/login",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./features/pages/home/home.component").then(m => m.HomeComponent)
    },
    {
        path: "categories",
        canActivate: [authGuard],
        loadComponent: () => import("./features/pages/categories/categories.component").then(m => m.CategoriesComponent)
    },
    {
        path: "products",
        canActivate: [authGuard],
        loadComponent: () => import("./features/pages/products/products.component").then(m => m.ProductsComponent)
    },
    {
        path: "checkout",
        canActivate: [authGuard],
        loadComponent: () => import("./features/pages/checkout/checkout.component").then(m => m.CheckoutComponent)
    },
    {
        path: "wishlist",
        canActivate: [authGuard],
        loadComponent: () => import("./features/pages/wishlist/wishlist.component").then(m => m.WishlistComponent)
    },
    {
        path: "product/:id",
        canActivate: [authGuard],
        loadComponent: () => import("./features/pages/products-details/products-details.component").then(m => m.ProductsDetailsComponent)
    },
    {
        path: "allorders",
        canActivate: [authGuard],
        loadComponent: () => import("./features/pages/orders/orders.component").then(m => m.OrdersComponent)
    },
    {
        path: "products",
        canActivate: [authGuard],
        loadComponent: () => import("./features/pages/products/products.component").then(m => m.ProductsComponent)
    },
    {
        path: "cart",
        canActivate: [authGuard],
        loadComponent: () => import("./features/pages/cart/cart.component").then(m => m.CartComponent)
    },
    {
        path: "brands",
        canActivate: [authGuard],
        loadComponent: () => import("./features/pages/brands/brands.component").then(m => m.BrandsComponent)
    },
    {
        path: "**",
        loadComponent: () => import("./core/pages/not-found/not-found.component").then(m => m.NotFoundComponent)
    },

];
