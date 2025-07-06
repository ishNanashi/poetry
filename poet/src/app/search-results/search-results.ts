import { Component, Input, OnDestroy, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Poem } from '../poem/poem.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-search-results',
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss'
})
export class SearchResults implements OnChanges, OnDestroy {
  // From app
  @Input() poems$!: Observable<Poem[]>;

  @Output() poemResult$ = new Subject<Poem>();

  // Create a table to display the poem info
  table = new MatTableDataSource<Poem>([]);
  data = ['title', 'author', 'linecount'];

  private _sub!: Subscription;

  ngOnChanges(sc: SimpleChanges) {
    if (this.poems$ && sc['poems$']) {
      this._sub = this.poems$.subscribe((poems) => {
        this.table.data = poems;
      });
    }
  }

  viewPoem(poem: Poem) {
    this.poemResult$.next(poem);
  }

  // Cleanup Subscription
  ngOnDestroy(): void {
      if (this._sub) {
        this._sub.unsubscribe();
      }
  }
}
