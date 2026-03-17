import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessorioListComponent } from './acessoriolist.component';

describe('AcessorioListComponent', () => {
  let component: AcessorioListComponent;
  let fixture: ComponentFixture<AcessorioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessorioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessorioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
