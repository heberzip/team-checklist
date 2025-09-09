import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/enviroment';
import { Observable } from 'rxjs';

import { ItemUpdateDTO, Item } from '../store/models/checklist.model';

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

  // PUT /api/checklists/{chlId}/items/update/{itemId}
  update(chlId: number, itemId: number, dto: ItemUpdateDTO) {
    const payload: ItemUpdateDTO = {};
    if (dto.done !== undefined) payload.done = dto.done;
    if (dto.text !== undefined) payload.text = dto.text;
    if (dto.lastEditedBy !== undefined) payload.lastEditedBy = dto.lastEditedBy;

    return this.http.put<Item>(
      `${this.base}/${chlId}/items/update/${itemId}`,
      payload
    );
  }

  // DELETE /api/chls/{chlId}/items/delete/{itemId}
  delete(chlId: number, itemId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.base}/${chlId}/items/delete/${itemId}`
    );
  }

  // Conveniencia para marcar hecho / deshecho
  updateDone(chlId: number, itemId: number, done: boolean, user?: string) {
    return this.update(chlId, itemId, { done, lastEditedBy: user });
  }

  // Conveniencia para editar solo el texto
  updateText(chlId: number, itemId: number, text: string, user?: string) {
    return this.update(chlId, itemId, { text, lastEditedBy: user });
  }
}
