import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Subject } from 'rxjs';
import { SearchFields } from './search.interface';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  @Output() search$ = new Subject<SearchFields>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      title: [''],
      author: [''],
    });
  }

  // Run a search
  search() {
    const searchParams: SearchFields = {
      title: this.searchForm.value.title,
      author: this.searchForm.value.author,
    };
    this.search$.next(searchParams);
  }
}
