import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Content } from '../../interfaces/content';
import { max, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ContentService } from '../../content.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game } from '../../interfaces/game';
import { GameService } from '../../game.service';
import { Variety } from '../../interfaces/variety';
import { AuthService } from '@auth0/auth0-angular';
import { VarietyService } from '../../variety.service';
import { RoleService } from '../../role.service';
import { ShortenContentPipe } from '../../shorten-content.pipe';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.css'],
  imports: [CommonModule, FormsModule, ShortenContentPipe, BackButtonComponent],
  standalone: true,
})
export class ContentFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  contentId: number = 0;
  nickname: string = '';

  user$ = this.auth.user$;
  isAdmin = signal(false);
  isWriter = signal(false);

  content: Content = {
    id: 0,
    title: '',
    body: '',
    score: null,
    gameId: 0,
    varietyId: 0,
    userName: this.nickname,
    isApproved: false,
    createdAt: new Date(),
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  content$: Subscription = new Subscription();
  postContent$: Subscription = new Subscription();
  putContent$: Subscription = new Subscription();

  games: Game[] = [];
  games$: Subscription = new Subscription();

  varieties: Variety[] = [];
  varieties$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private contentService: ContentService,
    private gameService: GameService,
    private varietyService: VarietyService,
    private auth: AuthService,
    private roleService: RoleService,
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    // plus sign converts string to number
    this.contentId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.contentId != null && this.contentId > 0) {
      this.content$ = this.contentService
        .getContentById(this.contentId)
        .subscribe((result) => (this.content = result));
    }

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
    this.getGames();
    this.getVarieties();
    this.content.userName = this.nickname; // Set the userName field to the current user's nickname
  }

  ngOnDestroy(): void {
    this.content$.unsubscribe();
    this.postContent$.unsubscribe();
    this.putContent$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.content.createdAt = new Date(); // Set the createdAt field to the current date and time
      if (this.isAdmin()) {
        this.postContent$ = this.contentService
          .postContent(this.content)
          .subscribe({
            // next is the success callback, error is the error callback
            next: (v) => this.router.navigateByUrl('/admin/content'),
            error: (e) => (this.errorMessage = e.message),
          });
      } else if (this.isWriter()) {
        this.postContent$ = this.contentService
          .postContent(this.content)
          .subscribe({
            // next is the success callback, error is the error callback
            next: (v) => this.router.navigateByUrl('/writer/content'),
            error: (e) => (this.errorMessage = e.message),
          });
      }
    }
    if (this.isEdit) {
      if (this.isAdmin()) {
        this.putContent$ = this.contentService
          .putContent(this.contentId, this.content)
          .subscribe({
            next: (v) => this.router.navigateByUrl('/admin/content'),
            error: (e) => (this.errorMessage = e.message),
          });
      } else if (this.isWriter()) {
        this.content.isApproved = false; // Set the isApproved field to false
        this.putContent$ = this.contentService
          .putContent(this.contentId, this.content)
          .subscribe({
            next: (v) => this.router.navigateByUrl('/writer/content'),
            error: (e) => (this.errorMessage = e.message),
          });
      }
    }
  }

  getGames() {
    this.games$ = this.gameService
      .getGames()
      .subscribe((result) => (this.games = result));
  }

  getVarieties() {
    this.varieties$ = this.varietyService
      .getVarieties()
      .subscribe((result) => (this.varieties = result));
  }
}
