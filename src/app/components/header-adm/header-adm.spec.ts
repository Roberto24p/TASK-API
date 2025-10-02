import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdm } from './header-adm';

describe('HeaderAdm', () => {
  let component: HeaderAdm;
  let fixture: ComponentFixture<HeaderAdm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAdm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAdm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
