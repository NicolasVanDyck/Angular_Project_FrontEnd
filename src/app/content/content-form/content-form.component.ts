import { Component, OnDestroy, OnInit } from '@angular/core';
import { Content } from '../../interfaces/content';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ContentService } from '../../content.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Game} from "../../interfaces/game";
import {GameService} from "../../game.service";
import {Variety} from "../../interfaces/variety";

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class ContentFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  contentId: number = 0;

  content: Content = {
    id: 0,
    body: '',
    score: 0,
    gameId: 0,
    varietyId: 0,
    userId: 0,
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
    // private varietyService: VarietyService,
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
  }

  ngOnInit(): void {
    this.getGames();
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
      this.postContent$ = this.contentService
        .postContent(this.content)
        .subscribe({
          // next is the success callback, error is the error callback
          next: (v) => this.router.navigateByUrl('/admin/content'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
    if (this.isEdit) {
      this.putContent$ = this.contentService
        .putContent(this.contentId, this.content)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/content'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
  }
  getGames() {
    this.games$ = this.gameService.getGames().subscribe(result =>
      this.games = result);
  }
  // getVarieties() {
  //   this.varieties$ = this.gameService.getVarieties().subscribe(result =>
  //     this.games = result);
  // }
}
