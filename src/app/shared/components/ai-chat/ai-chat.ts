import { Component, inject, OnInit } from '@angular/core';
import { AiService } from '../../services/ai-service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ai-chat',
  imports: [ReactiveFormsModule],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.scss',
})
export class AiChat implements OnInit {

  private aiService = inject(AiService);

  messageControl = new FormControl<string | null>('');

  isLoading = false;

  reply = '';

  products: any[] = [];

  ngOnInit(): void {
  }

  sendMessage() {

    this.isLoading = true;

    const message = this.messageControl.value?.trim();

    if (!message) {
      return;
    }

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
      },
    })
  }




}
