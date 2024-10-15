import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_BUTTON_GROUP_DIRECTIVES, IGX_CARD_DIRECTIVES, IgxButtonDirective, IgxIconButtonDirective, IgxIconComponent, IgxOverlayOutletDirective, IgxRippleDirective, IgxSnackbarComponent, IgxToggleActionDirective, IgxToggleDirective } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { CategoryModel } from '../models/real-toy-store-api/category-model';
import { ToyModel } from '../models/real-toy-store-api/toy-model';
import { RealToyStoreAPIService } from '../services/real-toy-store-api.service';

@Component({
  selector: 'app-view1',
  standalone: true,
  imports: [IGX_BUTTON_GROUP_DIRECTIVES, IGX_CARD_DIRECTIVES, IgxToggleActionDirective, IgxOverlayOutletDirective, IgxIconButtonDirective, IgxButtonDirective, IgxRippleDirective, IgxToggleDirective, IgxIconComponent, IgxSnackbarComponent, RouterLink],
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.scss']
})
export class View1Component implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _categoryID?: number;
  public get categoryID(): number | undefined {
    return this._categoryID;
  }
  public set categoryID(value: number | undefined) {
    this._categoryID = value;
    this.realToyStoreAPIToyModel$.next();
  }
  public realToyStoreAPICategoryModel: CategoryModel[] = [];
  public realToyStoreAPIToyModel: ToyModel[] = [];
  public realToyStoreAPIToyModel$: Subject<void> = new Subject<void>();


  constructor(
    private realToyStoreAPIService: RealToyStoreAPIService,
  ) {}

  ngOnInit() {
    this.realToyStoreAPIService.getCategoryModelList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.realToyStoreAPICategoryModel = data
    );
    this.realToyStoreAPIService.getToyModelList(this.categoryID as any).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.realToyStoreAPIToyModel = data
    );
    this.realToyStoreAPIToyModel$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.realToyStoreAPIService.getToyModelList(this.categoryID as any).pipe(take(1)).subscribe(
        data => this.realToyStoreAPIToyModel = data
    )});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.realToyStoreAPIToyModel$.complete();
    this.destroy$.complete();
  }

  public toggleButtonClick(item: CategoryModel) {
    this.categoryID = item.id;
  }
}
