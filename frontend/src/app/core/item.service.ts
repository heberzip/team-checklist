import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/checklists`;

  // GET /api/chls/{chlId}/items
  list(chlId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/${chlId}/items`);
  }

  // POST /api/chls/{chlId}/items/new
  create(chlId: number, text: string): Observable<any> {
    return this.http.post<any>(`${this.base}/${chlId}/items/new`, {
      text,
    });
  }

  // DELETE /api/chls/{chlId}/items/delete/{itemId}
  delete(chlId: number, itemId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.base}/${chlId}/items/delete/${itemId}`
    );
  }
}
