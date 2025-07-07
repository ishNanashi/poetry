import { Component, Input, OnDestroy, Output, OnChanges, SimpleChanges, ViewChild, } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Poem } from '../poem/poem.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-search-results',
  imports: [
    MatTableModule,
    MatInputModule,
    MatSortModule,
  ],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss'
})
export class SearchResults implements OnChanges, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;

  // From app
  @Input() poems$!: Observable<Poem[]>;

  @Output() poemResult$ = new Subject<Poem>();

  // Create a table to display the poem info
  table = new MatTableDataSource<Poem>([]);
  data = ['title', 'author', 'linecount'];

  private _sub!: Subscription;

  ngAfterViewInit() {
    this.table.sort = this.sort;
  }

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
