import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // constructor() { }
  private data = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Kiwi'];

  search(term: string): Observable<string[]> {
    if (!term.trim()) {
      return of([]);
    }
    return of(this.data.filter(item => item.toLowerCase().includes(term.toLowerCase())));
  }
}
