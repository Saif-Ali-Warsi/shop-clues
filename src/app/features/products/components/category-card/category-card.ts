import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';


interface Category {
  title: string;
  image: string;
  url:string;
}

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {


  categories: Category[] = [
    {
      title: 'Mobile Phones',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-1.png',
      url:'products?categories=smartphones'
    },
    {
      title: 'Laptops & Tablets',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-2.png',
      url:'products?categories=laptops'
    },
    {
      title: 'Televisions',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-3.png',
      url:'products?categories=tablets'
    },
    {
      title: 'PCs & Accessories',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-4.png',
      url:'products?categories=mobile-accessories'
    },
    {
      title: 'Audio & Video',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-5.png',
      url:'products?categories=sports-accessories'
    },
    {
      title: 'Gaming & Accessories',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-6.png',
      url:'products?categories=sunglasses'
    },
    {
      title: 'Home Appliances',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-7.png',
      url:'products?categories=kitchen-accessories'
    },
    {
      title: 'Kitchen Appliances',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-8.png',
      url:'products?categories=kitchen-accessories'
    },
    {
      title: 'Cameras',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-9.png',
      url:'products?categories=mens-watches'
    },
    {
      title: 'Consumables',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-10.png',
      url:'products?categories=groceries'
    },
    {
      title: 'Smart Homes',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-11.png',
      url:'products?categories=home-decoration'
    },
    {
      title: 'Accessories',
      image: 'https://superkart-demo.mybigcommerce.com/product_images/uploaded_images/category-12.png',
      url:'products?categories=mobile-accessories'
    }
  ];
}
