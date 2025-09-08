import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/enviroment';
import { Observable } from 'rxjs';
import { Checklist, ChecklistCreateDTO } from '../store/models/checklist.model';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/checklists`;

  // GET /api/checklists
  list(): Observable<Checklist[]> {
    return this.http.get<Checklist[]>(this.base);
  }

  // GET /api/checklists/{id}
  get(id: number): Observable<Checklist> {
    return this.http.get<Checklist>(`${this.base}/${id}`);
  }

  // POST /api/checklists/new
  create(dto: ChecklistCreateDTO): Observable<Checklist> {
    return this.http.post<Checklist>(`${this.base}/new`, dto);
  }

  edite(id: number, dto: Partial<ChecklistCreateDTO>): Observable<Checklist> {
    return this.http.put<Checklist>(`${this.base}/edit/${id}`, dto);
  }

  // DELETE /api/checklists/delete/{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/delete/${id}`);
  }
}
