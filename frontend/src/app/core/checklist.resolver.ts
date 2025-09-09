import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ChecklistService } from './checklist.service';

@Injectable({ providedIn: 'root' })
export class ChecklistResolver implements Resolve<any> {
  constructor(private api: ChecklistService) {}
  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    return this.api.get(id);
  }
}
