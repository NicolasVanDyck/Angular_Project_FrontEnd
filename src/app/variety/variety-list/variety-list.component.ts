import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Variety } from '../../interfaces/variety';
import { VarietyService } from '../../variety.service';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';

@Component({
  selector: 'app-variety-list',
  templateUrl: './variety-list.component.html',
  styleUrls: ['./variety-list.component.css'],
  imports: [CommonModule, BackButtonComponent],
  standalone: true,
})
export class VarietyListComponent implements OnInit, OnDestroy {
  varieties: Variety[] = [];
  varieties$: Subscription = new Subscription();
  deleteVariety$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(
    private varietyService: VarietyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getVarieties();
  }

  ngOnDestroy(): void {
    this.varieties$.unsubscribe();
    this.deleteVariety$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/variety/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/variety/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteVariety$ = this.varietyService.deleteVariety(id).subscribe({
      next: (v) => this.getVarieties(),
      error: (e) => (this.errorMessage = e.message),
    });
  }

  getVarieties() {
    this.varieties$ = this.varietyService
      .getVarieties()
      .subscribe((result) => (this.varieties = result));
  }
}
