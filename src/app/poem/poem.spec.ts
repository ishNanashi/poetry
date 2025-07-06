import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poem } from './poem';

describe('Poem', () => {
  let component: Poem;
  let fixture: ComponentFixture<Poem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Poem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Poem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
