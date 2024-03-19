import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Platform} from "../../interfaces/platform";
import {Subscription} from "rxjs";
import {CapitalLetter} from "../../validators/capital-letter";
import {Router} from "@angular/router";
import {PlatformService} from "../../platform.service";
import {Variety} from "../../interfaces/variety";
import {VarietyService} from "../../variety.service";

@Component({
  selector: 'app-variety-form',
  templateUrl: './variety-form.component.html',
  styleUrls: ['./variety-form.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class VarietyFormComponent implements OnInit, OnDestroy{
  isAdd: boolean = false;
  isEdit: boolean = false;
  varietyId: number = 0;

  variety: Variety = {
    id: 0,
    name: '',
    createdAt: new Date(),
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  variety$: Subscription = new Subscription();
  postVariety$: Subscription = new Subscription();
  putVariety$: Subscription = new Subscription();

  // reactive form
  varietyForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, CapitalLetter()]),
    createdAt: new FormControl(new Date()),
  });

  constructor(
    private router: Router,
    private varietyService: VarietyService,
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    // plus sign converts string to number
    this.varietyId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.varietyId != null && this.varietyId > 0) {
      this.variety$ = this.varietyService
        .getVarietyById(this.varietyId)
        .subscribe((result) => {
          this.varietyForm.setValue({
            id: result.id,
            name: result.name,
            createdAt: result.createdAt,
          });
        });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.variety$.unsubscribe();
    this.postVariety$.unsubscribe();
    this.putVariety$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.variety.createdAt = new Date(); // Set the createdAt field to the current date and time
      this.postVariety$ = this.varietyService
        .postVariety(this.varietyForm.value as Platform)
        .subscribe({
          // next is the success callback, error is the error callback
          next: (v) => this.router.navigateByUrl('/admin/variety'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
    if (this.isEdit) {
      this.putVariety$ = this.varietyService
        .putVariety(this.varietyId, this.varietyForm.value as Platform)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/platform'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
  }

}
