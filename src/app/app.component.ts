import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(
        translate: TranslateService
    )
    {
        translate.setDefaultLang('ca');
        translate.use('ca');
    }
}
