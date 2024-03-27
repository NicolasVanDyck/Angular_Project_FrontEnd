import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Platform } from '../../interfaces/platform';
import { PlatformService } from '../../platform.service';
import { CapitalLetter } from '../../validators/capital-letter';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';

@Component({
  selector: 'app-platform-form',
  templateUrl: './platform-form.component.html',
  styleUrls: ['./platform-form.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BackButtonComponent,
  ],
  standalone: true,
})
export class PlatformFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  platformId: number = 0;

  platform: Platform = {
    id: 0,
    name: '',
    createdAt: new Date(),
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  platform$: Subscription = new Subscription();
  postPlatform$: Subscription = new Subscription();
  putPlatform$: Subscription = new Subscription();

  // reactive form
  platformForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, CapitalLetter()]),
    createdAt: new FormControl(new Date()),
  });

  constructor(
    private router: Router,
    private platformService: PlatformService,
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    // plus sign converts string to number
    this.platformId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.platformId != null && this.platformId > 0) {
      this.platform$ = this.platformService
        .getPlatformById(this.platformId)
        .subscribe((result) => {
          this.platformForm.setValue({
            id: result.id,
            name: result.name,
            createdAt: result.createdAt,
          });
        });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.platform$.unsubscribe();
    this.postPlatform$.unsubscribe();
    this.putPlatform$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.platform.createdAt = new Date(); // Set the createdAt field to the current date and time
      this.postPlatform$ = this.platformService
        .postPlatform(this.platformForm.value as Platform)
        .subscribe({
          // next is the success callback, error is the error callback
          next: (v) => this.router.navigateByUrl('/admin/platform'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
    if (this.isEdit) {
      this.putPlatform$ = this.platformService
        .putPlatform(this.platformId, this.platformForm.value as Platform)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/platform'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
  }
}
