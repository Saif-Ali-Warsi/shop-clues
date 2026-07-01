import { Routes } from '@angular/router';
import { ProductList } from './features/products/pages/product-list/product-list';
import { ProductDetail } from './features/products/pages/product-detail/product-detail';
import { authGuard } from './features/auth/guards/auth-guard';

export const routes: Routes = [

    {
        path: '',
        component: ProductList
    },
    {
        path: 'products/:id',
        component: ProductDetail
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login')
        .then(c => c.Login)
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/pages/profile/profile')
        .then(c => c.Profile),
        canActivate:[authGuard]
    }

];
