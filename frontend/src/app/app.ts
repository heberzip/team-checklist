// src/app/app.ts
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastModule],
})
export class App {
  readonly title = signal('Team Checklist');

  toastPt = {
    root: { class: 'pointer-events-auto z-[1100]' },
    container: { class: 'mt-4 mr-4 w-80 space-y-3' },
    message: {
      class:
        'rounded-md shadow-lg overflow-hidden bg-primary-600 text-white px-6 py-2 ',
    },
    content: { class: 'p-4 flex gap-3 items-start' },
    icon: { class: 'shrink-0 mt-0.5 text-xl' },
    text: { class: 'flex-1' },
    summary: { class: 'font-semibold text-sm' },
    detail: { class: 'text-sm/6 opacity-80' },
    closebutton: { class: 'p-2 rounded-lg hover:bg-black/5 transition' },
  };
}
