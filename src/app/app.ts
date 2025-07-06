import { Component, OnDestroy, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PoetrydbService } from './poetrydb.service';
import { SearchFields } from './search/search.interface';
import { Search } from './search/search';
import { Observable, of, Subscription } from 'rxjs';
import { Poem } from './poem/poem.interface';
import { PoemComponent } from './poem/poem';
import { SearchResults } from './search-results/search-results';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  providers: [PoetrydbService],
  imports: [
    RouterOutlet,
    Search,
    SearchResults,
    PoemComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnDestroy {
  protected title = 'poet';

  @ViewChild(PoemComponent) poemView!: PoemComponent;
  @ViewChild(SearchResults) searchResults!: SearchResults;

  // Initialize as empty array
  poems$: Observable<Poem[]> = of([]);

  private _sub: Subscription = new Subscription();

  constructor(private readonly _poetryService: PoetrydbService) {}

  searchDB(params: SearchFields) {
    // Reset results for new search
    this.poems$ = of([]);

    if (params.title && params.author) {
      this.poems$ = this._poetryService.getByAuthorTitle(params.author, params.title);
    }
    else if (params.title) {
      this.poems$ = this._poetryService.getByTitle(params.title);
    }
    else if (params.author) {
      this.poems$ = this._poetryService.getByAuthor(params.author);
    }

    let hasResults = false;

    const searchsub = this.poems$.subscribe({
      next: (results) => {
        if (results.length > 0) {
          hasResults = true;
        }
      },
      error: (error) => {
        this.showToast(`An Error occurred! ${error}`);
      },
      complete: () => {
        if (!hasResults) {
          this.showToast("No results found!");
        }
      },
    });

    this._sub.add(searchsub);
  }

  openPoemView(poem: Poem) {
    this.poemView.poem = poem;
  }

  showToast(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  ngOnDestroy(): void {
      this._sub.unsubscribe();
  }
}
