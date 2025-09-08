import { Routes } from '@angular/router';
import { ChecklistList } from './features/checklists/checklist-list/checklist-list';
import { ChecklistForm } from './features/checklists/checklist-form/checklist-form';
import { ChecklistView } from './features/checklists/checklist-view/checklist-view';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'checklists' },
  { path: 'checklists', component: ChecklistList },
  { path: 'checklists/new', component: ChecklistForm },
  { path: 'checklists/:id/edit', component: ChecklistForm },
  { path: 'checklists/:id/details', component: ChecklistView },
  { path: '**', redirectTo: 'checklists' },
];
