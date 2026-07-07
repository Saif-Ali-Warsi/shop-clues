import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { UserProfile } from '../../models/profile.model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {

  private profileService = inject(ProfileService);

  profile = signal<UserProfile | null>(null);

  ngOnInit() {
    this.loadProfile();
  }


  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (response) => {
        this.profile.set(response)
      }
    })
  }
}
