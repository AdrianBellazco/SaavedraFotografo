import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NambarComponent } from './nambar.component';

describe('NambarComponent', () => {
  let component: NambarComponent;
  let fixture: ComponentFixture<NambarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NambarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NambarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
