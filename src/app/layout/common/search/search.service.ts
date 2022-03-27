import { UtilsService } from './../../../shared/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Injectable } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation';
import { cloneDeep } from 'lodash-es';

@Injectable({
    providedIn: 'root'
})
export class SearchService
{

    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private translate: TranslateService,
        private navigationService: NavigationService,
        private utils: UtilsService
    )
    {
    }

    getFilteredResults(query: string): any[] {
        const translations = this.translate.translations[this.translate.currentLang];
        const flatNavigation = this._fuseNavigationService.getFlatNavigation(this.navigationService.getStatic().default);

        const normalizedQuery: string = this.utils.normalizeString(query);

        const pagesResults = cloneDeep(flatNavigation).filter(page => {
            let titleMatch: boolean = false;
            if(page.title){
                let titleTranslationsObject: any = translations;
                let titleTranslate: string | undefined;

                const splittedTitle: string[] = page.title.split('.');
                splittedTitle.forEach((titleKey, index) => {
                    if(index === (splittedTitle.length - 1)){
                        titleTranslate = titleTranslationsObject[titleKey];
                    } else {
                        titleTranslationsObject = titleTranslationsObject[titleKey];
                    }
                });

                if(titleTranslate){
                    const normalizedTitle: string = this.utils.normalizeString(titleTranslate);
                    titleMatch = normalizedTitle.includes(normalizedQuery);
                }
            }

            let subtitleMatch: boolean = false;
            if(page.subtitle){
                let subtitleTranslationsObject: any = translations;
                let subtitleTranslate: string | undefined;

                const splittedSubtitle: string[] = page.subtitle.split('.');
                splittedSubtitle.forEach((subtitleKey, index) => {
                    if(index === (splittedSubtitle.length - 1)){
                        subtitleTranslate = subtitleTranslationsObject[subtitleKey];
                    } else {
                        subtitleTranslationsObject = subtitleTranslationsObject[subtitleKey];
                    }
                });

                if(subtitleTranslate){
                    const normalizedSubtitle: string = this.utils.normalizeString(subtitleTranslate);
                    subtitleMatch = normalizedSubtitle.includes(normalizedQuery);
                }
            }

            return titleMatch || subtitleMatch;
        });

        const results: any[] = [];

        // If there are page results...
        if ( pagesResults.length > 0 )
        {
            // Add to the results
            results.push({
                id     : 'pages',
                label  : 'SEARCH.PAGES-TITLE',
                results: pagesResults
            });
        }

        return results;
    }
}
