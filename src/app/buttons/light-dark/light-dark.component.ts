import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-light-dark',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './light-dark.component.html',
  styleUrls: ['./light-dark.component.css'],
})
export class LightDarkComponent {
  constructor(public themeService: ThemeService) {}
}
