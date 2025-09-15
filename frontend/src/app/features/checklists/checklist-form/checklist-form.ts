import {
  Component,
  inject,
  DestroyRef,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ChecklistService } from '../../../core/checklist.service';
import { ChecklistCreateDTO } from '../../../store/models/checklist.model';

import { ButtonModule } from 'primeng/button';
import { finalize, map } from 'rxjs';
import { MessageService } from 'primeng/api';

import { components } from '../../../../styles/components';

@Component({
  selector: 'chl-checklist-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './checklist-form.html',
})
export class ChecklistForm {
  private fb = inject(FormBuilder);
  private chlApi = inject(ChecklistService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private readonly msg = inject(MessageService);

  // Tailwind - primeNG styles
  pBtnSty = signal(components.ztBtn);
  pIconBtnSty = signal(components.ztIconBtn);

  // --- STATE ---
  loading = signal(false);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    description: ['', [Validators.maxLength(500)]],
  });

  chlId = toSignal(
    this.route.paramMap.pipe(map((pm) => Number(pm.get('id')) || 0)),
    { initialValue: 0 }
  );

  isNew = computed(() => this.chlId() === 0);
  pageTitle = computed(() =>
    this.isNew() ? 'Nuevo checklist' : 'Editar checklist'
  );
  submitLabel = computed(() => (this.isNew() ? 'Crear' : 'Actualizar'));

  formStatus = toSignal(this.form.statusChanges, {
    initialValue: this.form.status,
  });
  isDisabled = computed(() => this.formStatus() !== 'VALID' || this.loading());

  // --- EFFECTS ---
  constructor() {
    effect(() => {
      const id = this.chlId();
      if (id > 0) {
        this.load(id);
      } else {
        this.form.reset({ title: '', description: '' });
        this.loading.set(false);
      }
    });
  }

  // --- METHODS ---
  private load(id: number) {
    this.loading.set(true);
    this.chlApi
      .get(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (c) => {
          this.form.patchValue({
            title: c.title,
            description: c.description ?? '',
          }),
            this.loading.set(false);
        },
        error: (err) => {
          this.msg.add({
            severity: 'error',
            summary: 'Error de carga',
            detail: err.message || 'Checklist no encontrado',
            life: 4000,
          });
        },
      });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = this.form.getRawValue() as ChecklistCreateDTO;
    this.loading.set(true);

    const req$ = this.isNew()
      ? this.chlApi.create(dto)
      : this.chlApi.update(this.chlId(), dto);

    req$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: () => {
          this.msg.add({
            severity: 'success',
            summary: this.isNew() ? 'Creado' : 'Actualizado',
            detail: this.isNew()
              ? 'Checklist creado correctamente'
              : 'Checklist actualizado correctamente',
            life: 2000,
          });
          this.router.navigate(['/checklists']);
        },
        error: () =>
          this.msg.add({
            severity: 'error',
            summary: 'Error',
            detail: this.isNew()
              ? 'No se pudo crear el checklist'
              : 'No se pudo actualizar el checklist',
            life: 4000,
          }),
      });
  }

  back() {
    this.router.navigate(['/checklists']);
  }

  cancel() {
    this.router.navigate(['/checklists']);
  }
}
