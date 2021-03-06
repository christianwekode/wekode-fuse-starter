import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/pages/example/example.component';
import { PageLayoutsModule } from 'app/modules/ui/page-layouts/page-layouts.module';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        SharedModule,
        PageLayoutsModule
    ]
})
export class ExampleModule
{
}
