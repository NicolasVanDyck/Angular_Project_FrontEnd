import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dropdown.component.html',
  styleUrls: ['./admin-dropdown.component.css'],
})
export class AdminDropdownComponent implements OnInit {
  ngOnInit() {
    initFlowbite();
  }
}
