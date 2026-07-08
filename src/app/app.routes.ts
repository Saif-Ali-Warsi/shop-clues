import { Routes } from '@angular/router';
import { ProductList } from './features/products/pages/product-list/product-list';
import { ProductDetail } from './features/products/pages/product-detail/product-detail';
import { authGuard } from './features/auth/guards/auth-guard';
import { Bugs } from './shared/components/bugs/bugs';
import { guestGuard } from './core/guards/guest-guard';
import { HomePage } from './features/products/pages/home-page/home-page';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePage,
        title: 'Eshop Clues | Home'
    },
    {
        path: 'products',
        component: ProductList,
        title: 'Products | Eshop Clues'
    },
    {
        path: 'products/:id',
        component: ProductDetail,
        title: 'Products | Eshop Clues'
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login')
            .then(c => c.Login),
        canActivate: [guestGuard],
        title: 'Login | Eshop Clues'
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/pages/profile/profile')
            .then(c => c.Profile),
        canActivate: [authGuard],
        title: 'Profile | Eshop Clues'
    },
    {
        path: 'cart',
        loadComponent: () => import('./features/cart/pages/cart/cart').then(c => c.Cart),
        canActivate: [authGuard],
        title: 'Cart | Eshop Clues'
    },
    {
        path: 'checkout',
        loadComponent: () => import('./features/checkout/pages/checkout/checkout').then(c => c.Checkout),
        canActivate: [authGuard],
        title: 'Checkout | Eshop Clues'
    },
    {
        path: 'order-success',
        loadComponent: () => import('./features/checkout/pages/order-success/order-success').then(c => c.OrderSuccess),
        canActivate: [authGuard],
        title:'Order Success | Eshop Clues'
    },
    {
        path: 'bugs',
        component: Bugs,
        canActivate: [authGuard],
        title: 'Bugs'
    }

];
