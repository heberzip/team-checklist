import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  NavigationEnd,
} from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'zt-breadcrumbs',
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './zt-breadcrumbs.html',
})
export class ZtBreadcrumbs {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  items = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.buildBreadcrumbs(this.route.snapshot.root))
    ),
    { initialValue: [] as MenuItem[] }
  );

  private buildBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string = '',
    acc: MenuItem[] = []
  ): MenuItem[] {
    const segment = route.url.map((s) => s.path).join('/');
    const nextUrl = segment ? `${url}/${segment}` : url;

    let label: string | undefined;
    const bc = route.data?.['breadcrumb'];
    if (typeof bc === 'function') {
      try {
        label = bc(route.data, route.params);
      } catch {
        label = undefined;
      }
    } else {
      label = bc ?? (route.title as string | undefined);
    }
    if (!label && route.routeConfig?.path && route.routeConfig.path !== '') {
      label = route.routeConfig.path;
    }

    if (label) {
      acc.push({ label, routerLink: nextUrl || '/' });
    }

    const child = route.firstChild;
    return child ? this.buildBreadcrumbs(child, nextUrl, acc) : acc;
  }
}
