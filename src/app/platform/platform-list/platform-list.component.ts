import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '../../interfaces/platform';
import { Subscription } from 'rxjs';
import { PlatformService } from '../../platform.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class PlatformListComponent implements OnInit, OnDestroy {
  platforms: Platform[] = [];
  platforms$: Subscription = new Subscription();
  deletePlatform$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(
    private platformService: PlatformService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getPlatforms();
  }

  ngOnDestroy(): void {
    this.platforms$.unsubscribe();
    this.deletePlatform$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/platform/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/platform/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deletePlatform$ = this.platformService.deletePlatform(id).subscribe({
      next: (v) => this.getPlatforms(),
      error: (e) => (this.errorMessage = e.message),
    });
  }

  getPlatforms() {
    this.platforms$ = this.platformService.getPlatforms().subscribe(result =>
      this.platforms = result);
  }
}
