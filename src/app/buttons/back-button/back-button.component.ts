import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css'],
})
export class BackButtonComponent {
  @Input() isHome: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
  ) {}

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
