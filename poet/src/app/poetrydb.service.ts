import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Poem } from './poem/poem.interface';

@Injectable({
  providedIn: 'root',
})
export class PoetrydbService {
  baseURL = 'https://poetrydb.org'

  constructor(private http: HttpClient) {}

  // GET by Author
  getByAuthor(author: string): Observable<Poem[]> {
    return this._getRequest(`${this.baseURL}/author/${author}`);
  }

  // GET by Title
  getByTitle(title: string): Observable<Poem[]> {
    return this._getRequest(`${this.baseURL}/title/${title}`);
  }

  // GET by Author and Title
  getByAuthorTitle(author: string, title: string): Observable<Poem[]> {
    return this._getRequest(`${this.baseURL}/author,title/${author};${title}`);
  }

  // Pipe to error handling
  private _getRequest(url: string): Observable<Poem[]> {
    return this.http.get<Poem[]>(url).pipe(
      catchError(() => {
        return throwError(() => new Error(`An error occured while requesting: ${url}`))
      }),
    );
  }
}
