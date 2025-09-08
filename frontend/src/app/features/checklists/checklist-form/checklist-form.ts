import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChecklistService } from '../../../core/checklist.service';

@Component({
  selector: 'chl-checklist-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checklist-form.html',
})
export class ChecklistForm implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ChecklistService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  id?: number;
  title = 'Nuevo checklist';
  loading = false;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    description: ['', [Validators.maxLength(500)]],
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.title = 'Editar checklist';
      this.loading = true;
      this.api
        .get(this.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (c) => {
            this.form.patchValue({
              title: c.title,
              description: c.description ?? '',
            });
            this.loading = false;
          },
          error: () => (this.loading = false),
        });
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dto = this.form.value as any;

    const req$ = this.api.create(dto);

    req$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => this.router.navigate(['/checklists']),
      error: () => alert('Error guardando'),
    });
  }

  cancel() {
    this.router.navigate(['/checklists']);
  }
}
