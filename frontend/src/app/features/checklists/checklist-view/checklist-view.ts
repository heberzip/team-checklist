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
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  loading = false;
  chlData: Omit<Checklist, 'items'> | null = null;
  itmData: Item[] = [];
  error?: string;

  chlId = signal(Number(this.route.snapshot.paramMap.get('id')));

  ngOnInit() {
    this.loading = true;

    // load checlist header data
    this.chlApi
      .get(this.chlId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.chlData = res;

          if (this.chlData) {
            // load items data
            this.itmApi
              .list(this.chlData.id)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: (items) => {
                  this.itmData = items;
                  this.loading = false;

                  console.log('Items loaded:', items);
                },
                error: () => {
                  this.error = 'Error cargando datos de items';
                },
              });
          }
        },
        error: () => {
          this.error = 'Error cargando datos de checklist';
          this.loading = false;
        },
      });
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
      });
  }
}
