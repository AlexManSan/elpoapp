import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacaoPage } from './recomendacao.page';

describe('RecomendacaoPage', () => {
  let component: RecomendacaoPage;
  let fixture: ComponentFixture<RecomendacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
