import { Component, Input, numberAttribute, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxIconComponent, IgxOverlayOutletDirective, IgxRippleDirective, IgxToggleActionDirective, IgxToggleDirective } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { ToyModel } from '../models/real-toy-store-api/toy-model';
import { RealToyStoreAPIService } from '../services/real-toy-store-api.service';

@Component({
  selector: 'app-view2',
  standalone: true,
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IgxToggleActionDirective, IgxOverlayOutletDirective, IgxButtonDirective, IgxRippleDirective, IgxToggleDirective, IgxIconComponent, RouterLink],
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.scss']
})
export class View2Component implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _toyID: number = 102;
  @Input({ transform: numberAttribute })
  public get toyID(): number {
    return isNaN(this._toyID as any) ? 102 : this._toyID;
  }
  public set toyID(value: number) {
    this._toyID = value;
    this.toyFromRequest$.next();
  }
  public toyFromRequest?: ToyModel;
  public toyFromRequest$: Subject<void> = new Subject<void>();


  constructor(
    private realToyStoreAPIService: RealToyStoreAPIService,
  ) {}

  ngOnInit() {
    this.realToyStoreAPIService.getToyModel(this.toyID as any).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.toyFromRequest = data
    );
    this.toyFromRequest$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.realToyStoreAPIService.getToyModel(this.toyID as any).pipe(take(1)).subscribe(
        data => this.toyFromRequest = data
    )});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.toyFromRequest$.complete();
    this.destroy$.complete();
  }
}
