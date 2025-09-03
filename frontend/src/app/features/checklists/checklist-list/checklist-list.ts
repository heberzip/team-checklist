import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ChecklistService } from '../../../core/checklist.service';
import { Checklist } from '../../../store/models/checklist.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'chl-checklist-list',
  imports: [CommonModule, DatePipe],
  templateUrl: './checklist-list.html',
  styleUrl: './checklist-list.css'
})
export class ChecklistList implements OnInit {
  private api = inject(ChecklistService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  loading = false;
  data: Checklist[] = [];
  error?: string;

  ngOnInit() {
    this.loading = true;
    this.api.list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => { this.data = res; this.loading = false; },
        error: () => { this.error = 'Error cargando datos'; this.loading = false; }
      });
  }

  goNew() { this.router.navigate(['/checklists/new']); }

  // edit(id: number) { this.router.navigate(['/checklists', id, 'edit']); }

  delete(id: number) {
    if (!confirm('¿Eliminar checklist?')) return;
    this.api.remove(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.ngOnInit());
  }
}

