import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
    selector       : 'languages',
    templateUrl    : './languages.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'languages'
})
export class LanguagesComponent implements OnInit, OnDestroy
{
    availableLangs: { id: string }[];
    flagCodes: any;
    private activeLangSubject: BehaviorSubject<string> = new BehaviorSubject(undefined);
    public readonly activeLang$: Observable<string> = this.activeLangSubject.asObservable();

    private destroy$: Subject<boolean> = new Subject<boolean>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private translate: TranslateService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.activeLangSubject.next(this.translate.currentLang);
        // Get the available languages from translate service
        this.availableLangs = [
            {
                id: 'es'
            },
            {
                id: 'ca'
            },
            {
                id: 'en'
            }
        ];

        // Subscribe to language changes
        this.translate.onLangChange.subscribe((activeLang) => {
            // Get the active lang
            this.activeLangSubject.next(activeLang.lang);

            // Update the navigation
            this._updateNavigation(activeLang.lang);
        });

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            'es': 'es',
            'ca': 'ca',
            'en': 'en'
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void
    {
        // Set the active lang
        this.translate.use(lang);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void
    {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

        // Return if the navigation component does not exist
        if ( !navComponent )
        {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponent.navigation;

        // Get the Project dashboard item and update its title
        const projectDashboardItem = this._fuseNavigationService.getItem('dashboards.project', navigation);
        if ( projectDashboardItem )
        {
            const langs = this.translate.langs[this.translate.currentLang];
            projectDashboardItem.title = langs['Project'];

            navComponent.refresh();
        }

        // Get the Analytics dashboard item and update its title
        const analyticsDashboardItem = this._fuseNavigationService.getItem('dashboards.analytics', navigation);
        if ( analyticsDashboardItem )
        {
            const langs = this.translate.langs[this.translate.currentLang];
            analyticsDashboardItem.title = langs['Analytics'];

            navComponent.refresh();
        }
    }
}
