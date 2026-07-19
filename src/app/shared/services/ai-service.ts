import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AiService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/chat';

  sendMessage(message: string) {
    return this.http.post(this.apiUrl, { message })
  }

}
