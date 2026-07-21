import { Component, inject, OnInit } from '@angular/core';
import { AiService } from '../../services/ai-service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { PortalLoading } from '../portal-loading/portal-loading';

@Component({
  selector: 'app-ai-chat',
  imports: [RouterLink, ReactiveFormsModule, DecimalPipe, PortalLoading],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.scss',
})
export class AiChat implements OnInit {

  private aiService = inject(AiService);

  messageControl = new FormControl<string | null>('');

  isLoading = false;
  botVisible = false;

  reply = '';

  products: any[] = [];

  predefinedTasks = [
    'gaming laptops',
    'smart phones',
    'beauty products',
    'mobile accessories',
  ];

  showPredefinedTasks = true;

  ngOnInit(): void {
  }

  showAiBot() {
    this.botVisible = !this.botVisible
    this.newSearch()
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

  this.messageControl.reset();

  this.showPredefinedTasks = true;

  this.isLoading = false;
}


}
