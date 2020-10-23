import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MessageHelper {

  constructor(
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  public show(i18nKey: string) {
    const btn = this.translateService.instant('GLOBAL.BUTTONS.CLOSE');
    const msg = this.translateService.instant(i18nKey);
    this.snackBar.open(msg, btn, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

}
