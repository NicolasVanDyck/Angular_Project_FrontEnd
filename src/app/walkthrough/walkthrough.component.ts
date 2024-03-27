import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Content } from '../interfaces/content';
import { ContentService } from '../content.service';
import { ContentComponent } from '../content/content.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenContentPipe } from '../shorten-content.pipe';

@Component({
  selector: 'app-walkthrough',
  standalone: true,
  imports: [
    CommonModule,
    ContentComponent,
    ReactiveFormsModule,
    ShortenContentPipe,
  ],
  templateUrl: './walkthrough.component.html',
  styleUrls: ['./walkthrough.component.css'],
})
export class WalkthroughComponent {
  contents: Content[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    let filter: string = 'Walkthrough';
    let approved: boolean = true;
    this.contentService.getContents().subscribe((contents) => {
      this.contents = contents.filter(
        (content) =>
          content.variety?.name === filter && content.isApproved === approved,
      );
    });
  }
}
