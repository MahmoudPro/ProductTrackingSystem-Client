import { Routes } from '@angular/router';
import { Shop } from './pages/shop/shop';
import { Orders } from './pages/orders/orders';
import { Reports } from './pages/reports/reports';
import { UpdateProductComponent } from './pages/update-product/update-product';

export const routes: Routes = [
    {
        path: '',
        component: Shop
    },
    {
        path: 'shop',
        component: Shop
    },
    {
        path: 'orders',
        component: Orders
    },
    {
        path: 'reports',
        component: Reports
    },
    { 
        path: 'update-product/:id', 
        component: UpdateProductComponent
    }
];
