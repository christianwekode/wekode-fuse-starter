import { Component, ViewEncapsulation } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';

@Component({
    selector     : 'demo-sidebar',
    templateUrl  : './demo-sidebar.component.html',
    styleUrls    : ['./demo-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoSidebarComponent
{
    menuData: FuseNavigationItem[];

    /**
     * Constructor
     */
    constructor()
    {
        this.menuData = [
            // {
            //     title   : 'Actions',
            //     subtitle: 'Task, project & team',
            //     type    : 'group',
            //     children: [
            //         {
            //             title: 'Create task',
            //             type : 'basic',
            //             icon : 'heroicons_outline:plus-circle'
            //         },
            //         {
            //             title: 'Create team',
            //             type : 'basic',
            //             icon : 'heroicons_outline:user-group'
            //         },
            //         {
            //             title: 'Create project',
            //             type : 'basic',
            //             icon : 'heroicons_outline:briefcase'
            //         },
            //         {
            //             title: 'Create user',
            //             type : 'basic',
            //             icon : 'heroicons_outline:user-add'
            //         },
            //         {
            //             title   : 'Assign user or team',
            //             subtitle: 'Assign to a task or a project',
            //             type    : 'basic',
            //             icon    : 'heroicons_outline:badge-check'
            //         }
            //     ]
            // },
            {
                title   : 'EXAMPLE.FILTERS',
                type    : 'group',
                children: [
                    {
                        title: 'EXAMPLE.ALL-PRODUCTS',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-list',
                        badge: {
                            title  : '49',
                            classes: 'px-2 bg-primary text-on-primary rounded-full'
                        }
                    },
                    {
                        title: 'EXAMPLE.ON-CREATION',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-copy'
                    },
                    {
                        title: 'EXAMPLE.COMPLETED',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-check'
                    },
                    {
                        title: 'EXAMPLE.MISSING-IMPORTANT-INFO',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard'
                    }
                ]
            },
            // {
            //     title   : 'Settings',
            //     type    : 'group',
            //     children: [
            //         {
            //             title   : 'General',
            //             type    : 'collapsable',
            //             icon    : 'heroicons_outline:cog',
            //             children: [
            //                 {
            //                     title: 'Tasks',
            //                     type : 'basic'
            //                 },
            //                 {
            //                     title: 'Users',
            //                     type : 'basic'
            //                 },
            //                 {
            //                     title: 'Teams',
            //                     type : 'basic'
            //                 }
            //             ]
            //         },
            //         {
            //             title   : 'Account',
            //             type    : 'collapsable',
            //             icon    : 'heroicons_outline:user-circle',
            //             children: [
            //                 {
            //                     title: 'Personal',
            //                     type : 'basic'
            //                 },
            //                 {
            //                     title: 'Payment',
            //                     type : 'basic'
            //                 },
            //                 {
            //                     title: 'Security',
            //                     type : 'basic'
            //                 }
            //             ]
            //         }
            //     ]
            // },
            // {
            //     type: 'divider'
            // }
        ];
    }
}
