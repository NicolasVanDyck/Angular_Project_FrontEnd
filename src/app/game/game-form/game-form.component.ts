import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Game } from '../../interfaces/game';
import { GameService } from '../../game.service';
import { PlatformService } from '../../platform.service';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css'],
  imports: [CommonModule, FormsModule, BackButtonComponent],
  standalone: true,
})
export class GameFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  gameId: number = 0;

  game: Game = {
    id: 0,
    name: '',
    publisher: '',
    platformId: 0,
    createdAt: new Date(),
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  game$: Subscription = new Subscription();
  postGame$: Subscription = new Subscription();
  putGame$: Subscription = new Subscription();

  platforms: any[] = [];
  platforms$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private gameService: GameService,
    private platformService: PlatformService,
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    // plus sign converts string to number
    this.gameId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.gameId != null && this.gameId > 0) {
      this.game$ = this.gameService
        .getGameById(this.gameId)
        .subscribe((result) => (this.game = result));
    }
  }

  ngOnInit(): void {
    this.getPlatforms();
  }

  ngOnDestroy(): void {
    this.game$.unsubscribe();
    this.postGame$.unsubscribe();
    this.putGame$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.game.createdAt = new Date(); // Set the createdAt field to the current date and time
      this.postGame$ = this.gameService.postGame(this.game).subscribe({
        // next is the success callback, error is the error callback
        next: (v) => this.router.navigateByUrl('/admin/game'),
        error: (e) => (this.errorMessage = e.message),
      });
    }
    if (this.isEdit) {
      this.putGame$ = this.gameService
        .putGame(this.gameId, this.game)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/game'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
  }

  getPlatforms() {
    this.platforms$ = this.platformService
      .getPlatforms()
      .subscribe((result) => (this.platforms = result));
  }
}
