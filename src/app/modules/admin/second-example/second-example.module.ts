import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SecondExampleComponent } from 'app/modules/admin/second-example/pages/second-example/second-example.component';
import { PageLayoutsModule } from 'app/modules/ui/page-layouts/page-layouts.module';

const secondExampleRoutes: Route[] = [
    {
        path     : '',
        component: SecondExampleComponent
    }
];

@NgModule({
    declarations: [
        SecondExampleComponent
    ],
    imports     : [
        RouterModule.forChild(secondExampleRoutes),
        SharedModule,
        PageLayoutsModule
    ]
})
export class SecondExampleModule
{
}
