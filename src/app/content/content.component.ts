import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Content } from '../interfaces/content';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  @Input() content: Content = {
    body: '',
    createdAt: new Date(),
    game: undefined,
    gameId: 0,
    isApproved: false,
    score: 0,
    title: '',
    updatedAt: undefined,
    userName: '',
    variety: undefined,
    varietyId: 0,
    id: 0,
  };

  constructor() {}

  ngOnInit(): void {}
}
