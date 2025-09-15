import { Component, OnInit, inject, DestroyRef, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ChecklistService } from '../../../core/checklist.service';
import { Checklist } from '../../../store/models/checklist.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { components } from '../../../../styles/components';

@Component({
  selector: 'chl-checklist-list',
  imports: [CommonModule, DatePipe, ButtonModule],
  templateUrl: './checklist-list.html',
})
export class ChecklistList implements OnInit {
  private api = inject(ChecklistService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private readonly msg = inject(MessageService);

  // Tailwind - primeNG styles
  pBtnSty = signal(components.ztBtn);
  pIconBtnSty = signal(components.ztIconBtn);

  loading = false;
  data: Checklist[] = [];
  error?: string;

  description = signal('Description');

  ngOnInit() {
    this.loading = true;
    this.api
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.data = res;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error cargando datos';
          this.loading = false;
        },
      });
  }

  goNew() {
    this.router.navigate(['/checklists/new']);
  }

  goEdit(id: number) {
    this.router.navigate([`/checklists/${id}/edit`]);
  }

  openDetails(id: number) {
    this.router.navigate([`/checklists/${id}/details`]);
  }

  delete(id: number) {
    if (!confirm('¿Eliminar checklist?')) return;

    this.api
      .delete(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.ngOnInit();
          this.msg.add({
            severity: 'info',
            summary: 'Eliminado',
            detail: 'Checklist eliminado correctamente',
            life: 2000,
          });
        },
        error: (err) =>
          this.msg.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message ?? 'No se pudo eliminar el checklist',
            life: 4000,
          }),
      });
  }
}
