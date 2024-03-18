import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Game} from "../../interfaces/game";
import {GameService} from "../../game.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class GameListComponent implements OnInit, OnDestroy{
  games: Game[] = [];
  games$: Subscription = new Subscription();
  deleteGame$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getGames();
  }

  ngOnDestroy(): void {
    this.games$.unsubscribe();
    this.deleteGame$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/game/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/game/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteGame$ = this.gameService.deleteGame(id).subscribe({
      next: (v) => this.getGames(),
      error: (e) => (this.errorMessage = e.message),
    });
  }

  getGames() {
    this.games$ = this.gameService.getGames().subscribe(result =>
      this.games = result);
  }

}
