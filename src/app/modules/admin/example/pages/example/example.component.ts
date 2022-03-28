import { Component, ViewEncapsulation } from '@angular/core';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    styleUrls    : ['./example.component.scss']
})
export class ExampleComponent
{
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService
    )
    {
    }

    /**
    * On init
    */
    ngOnInit(): void {
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(({matchingAliases}) => {
            // Set the drawerMode and drawerOpened if
            if ( matchingAliases.includes('lg') ) {
                this.drawerMode = 'side';
                this.drawerOpened = true;
            } else {
                this.drawerMode = 'over';
                this.drawerOpened = false;
            }
        });
    }

    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
