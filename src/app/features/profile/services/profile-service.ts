import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { UserProfile } from '../models/profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private readonly baseurl = environment.apiUrl;

  private http = inject(HttpClient);


getProfile(): Observable<UserProfile>{
  return this.http.get<UserProfile>(`${this.baseurl}/auth/me`)
}

}
