import { Routes } from '@angular/router';
import { ChecklistList } from './features/checklists/checklist-list/checklist-list';
import { ChecklistForm } from './features/checklists/checklist-form/checklist-form';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'checklists' },
  { path: 'checklists', component: ChecklistList },
  { path: 'checklists/new', component: ChecklistForm },
  { path: 'checklists/:id/edit', component: ChecklistForm },
  { path: '**', redirectTo: 'checklists' }
];
