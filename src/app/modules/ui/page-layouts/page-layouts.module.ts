import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'app/shared/shared.module';
import { DemoSidebarModule } from './common/demo-sidebar/demo-sidebar.module';


@NgModule({
    imports     : [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatTabsModule,
        SharedModule,
        DemoSidebarModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatTabsModule,
        DemoSidebarModule
    ]
})
export class PageLayoutsModule
{
}
