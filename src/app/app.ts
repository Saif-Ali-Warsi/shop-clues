import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { LoadingSpinner } from './shared/components/loading-spinner/loading-spinner';
import { AiChat } from './shared/components/ai-chat/ai-chat';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, LoadingSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
