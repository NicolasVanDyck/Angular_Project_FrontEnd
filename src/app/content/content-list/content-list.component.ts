import { Component, OnDestroy, OnInit } from '@angular/core';
import { Content } from '../../interfaces/content';
import { Subscription } from 'rxjs';
import { ContentService } from '../../content.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class ContentListComponent implements OnInit, OnDestroy {
  contents: Content[] = [];
  contents$: Subscription = new Subscription();
  deleteContent$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(
    private contentService: ContentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getContents();
  }

  ngOnDestroy(): void {
    this.contents$.unsubscribe();
    this.deleteContent$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/content/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/content/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteContent$ = this.contentService.deleteContent(id).subscribe({
      next: (v) => this.getContents(),
      error: (e) => (this.errorMessage = e.message),
    });
  }

  getContents() {
    this.contents$ = this.contentService.getContents().subscribe((result) => {
      this.contents = result.$values;
      console.log(this.contents);
    });
  }
}
