import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Saber } from './saber/saber.modal';

@Injectable({
    providedIn: 'root'
})
export class SabersService {
    constructor(private http : HttpClient) {

    }

    sabersChanged = new Subject<Saber[]>();
    saber = new Subject<Saber>();
    private sabers: Saber[];

    getSabers() {
        if(this.sabers) {
            return this.sabers;
        }
        this.http.get<Saber[]>('https://saber-shop.firebaseio.com/sabers.json').subscribe(sabers => {
            this.sabers = Object.keys(sabers).map(saberKey => {
                return {
                    ...sabers[saberKey],
                    id: saberKey,
                    showDetail: false
                }
            });
            this.sabersChanged.next(this.sabers.slice());
        });
        return null;
    }
    setSaber(saber: Saber) {
        this.http.put<Saber>(`https://saber-shop.firebaseio.com/sabers/${saber.id}.json`, saber).subscribe(response => {
            const index = this.sabers.findIndex(savedSaber =>  saber.id === savedSaber.id);
            this.sabers[index] = saber;
            this.sabersChanged.next(this.sabers.slice());
        })
    }

    getSaber(id: string) {
        if(this.sabers) {
            return this.sabers.find(saber => saber.id === id);
        }
        this.http.get<Saber>(`https://saber-shop.firebaseio.com/sabers/${id}.json`).subscribe(response => {
            this.saber.next(response);
        });
        return null;
    }

    addSaber(saber: Saber) {
        this.http.post<Saber>(`https://saber-shop.firebaseio.com/sabers.json`, saber).subscribe(response => {
            saber.id = response.name;
            this.sabers.push(saber);
            this.sabersChanged.next(this.sabers.slice());
        })
    }
}