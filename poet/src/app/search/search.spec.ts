import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchParams } from './search-params';

describe('SearchParams', () => {
  let component: SearchParams;
  let fixture: ComponentFixture<SearchParams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchParams]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchParams);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
