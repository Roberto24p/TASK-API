import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTask } from './table-task';

describe('TableTask', () => {
  let component: TableTask;
  let fixture: ComponentFixture<TableTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
