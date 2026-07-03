import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading-service';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss',
})
export class LoadingSpinner {

  private loadingService = inject(LoadingService);

  isLoading = this.loadingService.isLoading;

}
