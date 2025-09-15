// src/app/app.ts
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
//import { ZtBreadcrumbs } from './ui/zt-breadcrumbs/zt-breadcrumbs';

import { ToastModule } from 'primeng/toast';
import { NgClass } from '@angular/common';

import { components } from '../styles/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastModule, NgClass],
})
export class App {
  readonly title = signal('Team Checklist');
  pToastSty = signal(components.ztToast);
}
