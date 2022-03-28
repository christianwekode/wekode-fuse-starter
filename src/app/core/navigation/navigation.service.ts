import { FuseNavigationItem } from '@fuse/components/navigation';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Navigation } from 'app/core/navigation/navigation.types';

@Injectable({
    providedIn: 'root'
})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    private navigationData: FuseNavigationItem[] = [
        {
            id   : 'example-overview',
            title: 'NAVIGATION.EXAMPLE-OVERVIEW',
            type : 'basic',
            icon : 'heroicons_outline:database',
            link : '/example'
        },
        {
            id   : 'example-overview',
            title: 'NAVIGATION.SECOND-EXAMPLE-OVERVIEW',
            type : 'basic',
            icon : 'heroicons_outline:arrows-expand',
            link : '/second-example'
        }
    ];

    private navigation: Navigation = {
        compact: [...this.navigationData],
        default: [...this.navigationData],
        futuristic: [...this.navigationData],
        horizontal: [...this.navigationData],
    };

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation>
    {
        this._navigation.next(this.navigation);
        return of(this.navigation)
    }

    getStatic(): Navigation {
        return this.navigation;
    }
}
