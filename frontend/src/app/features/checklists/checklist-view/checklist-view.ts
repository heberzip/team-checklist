import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistService } from '../../../core/checklist.service';
import { ItemService } from '../../../core/item.service';
import { Checklist, Item } from '../../../store/models/checklist.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonModule } from 'primeng/button';
import { ItemForm, ItemFormValue } from '../../items/item-form';

import { components } from '../../../../styles/components';

@Component({
  selector: 'chl-checklist-view',
  imports: [CommonModule, ButtonModule, ItemForm],
  templateUrl: './checklist-view.html',
})
export class ChecklistView implements OnInit {
  private chlApi = inject(ChecklistService);
  private itmApi = inject(ItemService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  //styles
  pBtnSty = signal(components.ztBtn);
  pIconBtnSty = signal(components.ztIconBtn);

  chlData: Omit<Checklist, 'items'> | null = null;
  itmSgn = signal<Item[]>([]);

  loading = signal(false);
  error = signal<string | null>(null);
  chlId = signal(Number(this.route.snapshot.paramMap.get('id')));

  doneCount = computed(() =>
    this.itmSgn().reduce((acc, i) => acc + (i?.done ? 1 : 0), 0)
  );
  totalCount = computed(() => this.itmSgn().length);
  progressLbl = computed(() => `${this.doneCount()} / ${this.totalCount()}`);
  progressPct = computed(() =>
    this.totalCount()
      ? Math.round((this.doneCount() * 100) / this.totalCount())
      : 0
  );

  // DIALOG
  showItemDialog = signal(false);
  editingItem = signal<ItemFormValue | null>(null);

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
                  this.itmSgn.set(items);
                  this.loading.set(false);
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

  goBack() {
    this.router.navigate(['/checklists']);
  }

  goNew() {
    this.openCreate();
  }

  goEdit(itmId: number) {
    const itm = this.itmSgn().find((x) => x.id === itmId);
    if (itm) this.openEdit(itm);
  }

  toggleDone(i: Item, checked: boolean) {
    this.itmApi
      .updateDone(this.chlId(), i.id, checked, 'user@mail.com')
      .subscribe((updated) => {
        this.itmSgn.update((arr) =>
          arr.map((x) => (x.id === updated.id ? updated : x))
        );
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
        error: () => {
          this.error.set('No se pudo eliminar el ítem');
        },
      });
  }

  openCreate() {
    this.editingItem.set(null);
    this.showItemDialog.set(true);
  }

  openEdit(itm: Item) {
    this.editingItem.set({ id: itm.id, text: itm.text });
    this.showItemDialog.set(true);
  }

  onDialogSave(payload: ItemFormValue) {
    const dto = { text: payload.text };

    if (payload.id) {
      // UPDATE
      this.itmApi.update(this.chlId(), payload.id, dto).subscribe({
        next: (updated: Item) => {
          this.itmSgn.update((list) =>
            list.map((x) =>
              x.id === updated.id ? { ...x, text: updated.text } : x
            )
          );
        },
        error: () => this.error.set('No se pudo actualizar el ítem'),
      });
    } else {
      // CREATE
      this.itmApi.create(this.chlId(), dto.text).subscribe({
        next: (created: Item) => {
          this.itmSgn.update((list) => [created, ...list]);
        },
        error: () => this.error.set('No se pudo crear el ítem'),
      });
    }
  }

  onDialogCancel() {
    // opcional: toasts/logs
  }
}
