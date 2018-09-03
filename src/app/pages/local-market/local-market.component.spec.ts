import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalMarketComponent } from './local-market.component';

describe('LocalMarketComponent', () => {
  let component: LocalMarketComponent;
  let fixture: ComponentFixture<LocalMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
