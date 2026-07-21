import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AiService } from '../../services/ai-service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { PortalLoading } from '../portal-loading/portal-loading';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-ai-chat',
  imports: [RouterLink, ReactiveFormsModule, DecimalPipe, PortalLoading],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.scss',
})
export class AiChat implements OnInit, OnDestroy {

  private aiService = inject(AiService);
  private router = inject(Router);

  messageControl = new FormControl<string | null>('');

  isLoading = false;
  botVisible = false;
  hasNoResults = false;
  showBot = true;

  reply = '';

  products: any[] = [];

  predefinedTasks = [
    'groceries',
    'gaming laptops',
    'smart phones',
    'mobile-accessories',
    'beauty products',
    'sunglasses',
    'skin-care',
    'fragrances',
    'home decoration',
  ];

  showPredefinedTasks = true;

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        const hiddenRoutes = [
          '/checkout',
          '/login',
          '/register'
        ];

        this.showBot = !hiddenRoutes.some(route =>
          this.router.url.startsWith(route)
        );

        if (!this.showBot) {
          this.botVisible = false;
        }
      });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('no-scroll');
  }

  showAiBot() {
    this.botVisible = !this.botVisible
    if (this.botVisible) {
      this.newSearch();

      if (window.innerWidth <= 576) {
        document.body.classList.add('no-scroll');
      }
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  searchTask(task: string) {
    this.messageControl.setValue(`Show ${task}`);
    this.sendMessage();
  }

  sendMessage() {

    const message = this.messageControl.value?.trim();

    if (!message) {
      return;
    }

    this.isLoading = true;
    this.showPredefinedTasks = false;

    this.aiService.sendMessage(message).subscribe({
      next: (response: any) => {

        this.reply = response.reply;

        this.products = response.products;

        this.hasNoResults = this.products.length === 0;

        this.messageControl.reset();

        this.isLoading = false;

      },
      error: (error) => {
        console.error(error);

        this.isLoading = false;

        this.showPredefinedTasks = true;
      }
    });
  }

  newSearch() {

    this.reply = '';
    this.products = [];
    this.hasNoResults = false;
    this.messageControl.reset();
    this.showPredefinedTasks = true;
  }




}
