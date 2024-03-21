import { Component, HostBinding, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'review';

  @HostBinding('class.dark') get mode() {
    return this.themeService.darkMode();
  }

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    initFlowbite();
  }
}
