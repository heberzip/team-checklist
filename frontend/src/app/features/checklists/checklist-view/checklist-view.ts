import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistService } from '../../../core/checklist.service';
import { ItemService } from '../../../core/item.service';
//import { Observable, switchMap } from 'rxjs';
import { Checklist, Item } from '../../../store/models/checklist.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'chl-checklist-view',
  imports: [CommonModule, ButtonModule],
  templateUrl: './checklist-view.html',
})
export class ChecklistView implements OnInit {
  private chlApi = inject(ChecklistService);
  private itmApi = inject(ItemService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  chlData: Omit<Checklist, 'items'> | null = null;
  itmData: Item[] = [];

  loading = signal(false);
  error = signal<string | null>(null);
  chlId = signal(Number(this.route.snapshot.paramMap.get('id')));

  ngOnInit() {
    this.loading.set(true);

    this.chlApi
      .get(this.chlId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.chlData = res;

          if (this.chlData) {
            this.itmApi
              .list(this.chlData.id)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: (items) => {
                  this.itmData = items;
                  this.loading.set(false);

                  console.log('Items loaded:', items);
                },
                error: () => {
                  this.error.set('Error cargando datos de items');
                },
              });
          }
        },
        error: () => {
          this.error.set('Error cargando datos del checklist');
          this.loading.set(false);
        },
      });
  }

  // navigation
  goBack() {
    this.router.navigate(['/checklists']);
  }

  goNew() {
    this.router.navigate([`/checklists/${this.chlId()}/items/new`]);
  }

  goEdit(itmId: number) {
    this.router.navigate([`/checklists/${this.chlId()}/items/${itmId}/edit`]);
  }

  delete(chlId: number, itmId: number) {
    if (!confirm('¿Eliminar esta task?')) return;

    this.itmApi
      .delete(chlId, itmId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.ngOnInit();
        },
        error: () => {
          this.error.set('No se pudo eliminar el ítem');
        },
      });
  }
}
