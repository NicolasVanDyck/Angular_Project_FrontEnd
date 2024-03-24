import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Content } from '../interfaces/content';
import { ContentService } from '../content.service';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ContentComponent],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  contents: Content[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    let filter: string = 'Review';
    let approved: boolean = true;
    this.contentService.getContents().subscribe((contents) => {
      this.contents = contents.filter(
        (content) =>
          content.variety?.name === filter && content.isApproved === approved,
      );
    });
  }
}
