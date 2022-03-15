import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Message } from 'app/layout/common/messages/messages.types';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class MessagesService
{
    private _messages: ReplaySubject<Message[]> = new ReplaySubject<Message[]>(1);

    private messages: Message[] = [
        {
            id         : '832276cc-c5e9-4fcc-8e23-d38e2e267bc9',
            image      : 'assets/images/avatars/male-01.jpg',
            title      : 'Gary Peters',
            description: 'We should talk about that at lunch!',
            time       : moment().subtract(25, 'minutes').toISOString(), // 25 minutes ago
            read       : false
        },
        {
            id         : '608b4479-a3ac-4e26-8675-3609c52aca58',
            image      : 'assets/images/avatars/male-04.jpg',
            title      : 'Leo Gill (Client #8817)',
            description: 'You can download the latest invoices now. Please check and let me know.',
            time       : moment().subtract(50, 'minutes').toISOString(), // 50 minutes ago
            read       : false
        },
        {
            id         : '22148c0c-d788-4d49-9467-447677d11b76',
            image      : 'assets/images/avatars/female-01.jpg',
            title      : 'Sarah',
            description: 'Don\'t forget to pickup Jeremy after school!',
            time       : moment().subtract(3, 'hours').toISOString(), // 3 hours ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true
        },
        {
            id         : '492e2917-760c-4921-aa5a-3201a857cd48',
            image      : 'assets/images/avatars/female-12.jpg',
            title      : 'Nancy Salazar &bull; Joy Publishing',
            description: 'I\'ll proof read your bio on next Monday.',
            time       : moment().subtract(5, 'hours').toISOString(), // 5 hours ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true
        },
        {
            id         : '214a46e5-cae7-4b18-9869-eabde7c7ea52',
            image      : 'assets/images/avatars/male-06.jpg',
            title      : 'Matthew Wood',
            description: 'Dude, I heard that they are going to promote you! Congrats man, tonight the drinks are on me!',
            time       : moment().subtract(7, 'hours').toISOString(), // 7 hours ago
            read       : false,
            link       : '/dashboards/project',
            useRouter  : true
        },
        {
            id         : '95930319-61cc-4c7e-9324-f1091865330c',
            image      : 'assets/images/avatars/female-04.jpg',
            title      : 'Elizabeth (New assistant)',
            description: 'Boss, I\'ve sent all client invoices but Geoffrey refusing to pay.',
            time       : moment().subtract(9, 'hours').toISOString(), // 9 hours ago
            read       : false,
            link       : '/dashboards/project',
            useRouter  : true
        },
        {
            id         : '802935e9-9577-48bc-98d1-308a4872afd7',
            image      : 'assets/images/avatars/male-06.jpg',
            title      : 'William Bell',
            description: 'Did you see this game? We should hang out and give it a shot sometime.',
            time       : moment().subtract(1, 'day').toISOString(), // 1 day ago
            read       : true,
            link       : 'https://www.google.com',
            useRouter  : false
        },
        {
            id         : '059f3738-633b-48ea-ad83-19016ce24c62',
            image      : 'assets/images/avatars/female-09.jpg',
            title      : 'Cheryl Obrien - HR',
            description: 'Why did\'t you still look at the kitten pictures I\'ve sent to you!',
            time       : moment().subtract(3, 'days').toISOString(), // 3 days ago
            read       : false,
            link       : '/dashboards/project',
            useRouter  : true
        },
        {
            id         : '5c2bb44d-5ca7-42ff-ad7e-46ced9f49a24',
            image      : 'assets/images/avatars/female-15.jpg',
            title      : 'Joan Jones - Tech',
            description: 'Dude, Cheryl keeps bugging me with kitten pictures all the time :( What are we gonna do about it?',
            time       : moment().subtract(4, 'day').toISOString(), // 4 days ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true
        }
    ];

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
     * Getter for messages
     */
    get messages$(): Observable<Message[]>
    {
        return this._messages.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all messages
     */
    getAll(): Observable<Message[]>
    {
        return of(this.messages);
    }

    /**
     * Create a message
     *
     * @param message
     */
    create(message: Message): Observable<Message>
    {
        return this.messages$.pipe(
            take(1),
            map(messages => {
                // Update the messages with the new message
                this._messages.next([...messages, message]);

                // Return the new message from observable
                return message;
            })
        );
    }

    /**
     * Delete the message
     *
     * @param id
     */
    delete(id: string): Observable<boolean>
    {
        return this.messages$.pipe(
            take(1),
            map(messages => {
                // Find the index of the deleted message
                const index = messages.findIndex(item => item.id === id);

                // Delete the message
                messages.splice(index, 1);

                // Update the messages
                this._messages.next(messages);

                // Return the deleted status
                return true;
            })
            // switchMap(messages => this._httpClient.delete<boolean>('api/common/messages', {params: {id}}).pipe(
            //     map((isDeleted: boolean) => {

            //     })
            // ))
        );
    }

    /**
     * Update the message
     *
     * @param id
     * @param message
     */
 update(id: string, message: Message): Observable<Message>
 {
     return this.messages$.pipe(
         take(1),
         map(messages => {
             // Find the index of the updated message
             const index = messages.findIndex(item => item.id === id);

             // Update the message
             messages[index] = message;

             // Update the messages
             this._messages.next(messages);

             // Return the updated message
             return message;
         })
        //  switchMap(messages => this._httpClient.patch<Message>('api/common/messages', {
        //      id,
        //      message
        //  }).pipe(
        //      map((updatedMessage: Message) => {
        //      })
        //  ))
     );
 }

    /**
     * Mark all messages as read
     */
    markAllAsRead(): Observable<boolean>
    {
        return this.messages$.pipe(
            take(1),
            map(messages => {
                // Go through all messages and set them as read
                messages.forEach((message, index) => {
                    messages[index].read = true;
                });

                // Update the messages
                this._messages.next(messages);

                // Return the updated status
                return true;
            })
            // switchMap(messages => this._httpClient.get<boolean>('api/common/messages/mark-all-as-read').pipe(
            //     map((isUpdated: boolean) => {
            //     })
            // ))
        );
    }
}
