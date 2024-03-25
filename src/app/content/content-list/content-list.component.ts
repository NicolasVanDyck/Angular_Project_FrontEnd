import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Content } from '../../interfaces/content';
import { Subscription } from 'rxjs';
import { ContentService } from '../../content.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { RoleService } from '../../role.service';
import { ShortenContentPipe } from '../../shorten-content.pipe';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css'],
  imports: [CommonModule, ShortenContentPipe],
  standalone: true,
})
export class ContentListComponent implements OnInit, OnDestroy {
  contents: Content[] = [];
  contents$: Subscription = new Subscription();
  deleteContent$: Subscription = new Subscription();

  user$ = this.auth.user$;
  nickname: string = '';
  isAdmin = signal(false);
  isWriter = signal(false);

  errorMessage: string = '';

  constructor(
    private contentService: ContentService,
    private auth: AuthService,
    public roleService: RoleService,
    private router: Router,
  ) {
    this.user$.subscribe((user) => {
      if (user) {
        this.nickname = user.nickname ? user.nickname : '';
      }
    });
    this.roleService.hasPermission('admin').subscribe((r) => {
      this.isAdmin.set(r);
    });
    this.roleService.hasPermission('writer').subscribe((r) => {
      this.isWriter.set(r);
    });
  }

  ngOnInit(): void {
    this.getContents();
  }

  ngOnDestroy(): void {
    this.contents$.unsubscribe();
    this.deleteContent$.unsubscribe();
  }

  add() {
    if (this.isAdmin()) {
      //Navigate to form in add mode
      this.router.navigate(['admin/content/form'], { state: { mode: 'add' } });
    } else if (this.isWriter()) {
      this.router.navigate(['writer/content/form'], { state: { mode: 'add' } });
    }
  }

  edit(id: number) {
    if (this.isAdmin()) {
      //Navigate to form in edit mode
      this.router.navigate(['admin/content/form'], {
        state: { id: id, mode: 'edit' },
      });
    } else if (this.isWriter()) {
      this.router.navigate(['writer/content/form'], {
        state: { id: id, mode: 'edit' },
      });
    }
  }

  delete(id: number) {
    this.deleteContent$ = this.contentService.deleteContent(id).subscribe({
      next: (v) => this.getContents(),
      error: (e) => (this.errorMessage = e.message),
    });
  }

  getContents() {
    this.contents$ = this.contentService.getContents().subscribe((result) => {
      if (this.isAdmin()) {
        this.contents = result;
      } else if (this.isWriter()) {
        this.contents = result.filter((c) => c.userName === this.nickname);
      }
    });
  }
}
