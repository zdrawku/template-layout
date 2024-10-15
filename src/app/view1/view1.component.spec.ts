import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IGX_BUTTON_GROUP_DIRECTIVES, IgxButtonDirective, IgxRippleDirective, IGX_CARD_DIRECTIVES, IgxIconButtonDirective, IgxToggleDirective, IgxToggleActionDirective, IgxOverlayOutletDirective, IgxIconComponent, IgxSnackbarComponent } from 'igniteui-angular';
import { View1Component } from './view1.component';

describe('View1Component', () => {
  let component: View1Component;
  let fixture: ComponentFixture<View1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ View1Component, NoopAnimationsModule, FormsModule, RouterTestingModule, HttpClientTestingModule, IGX_BUTTON_GROUP_DIRECTIVES, IgxButtonDirective, IgxRippleDirective, IGX_CARD_DIRECTIVES, IgxIconButtonDirective, IgxToggleDirective, IgxToggleActionDirective, IgxOverlayOutletDirective, IgxIconComponent, IgxSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(View1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
