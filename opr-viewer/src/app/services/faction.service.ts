import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Faction } from '../models/faction';
import { FactionMap } from '../models/faction-map';
import { Factions } from '../models/factions';

@Injectable({
  providedIn: 'root',
})
export class FactionService {
  url: string = 'https://webapp.onepagerules.com/api/army-books/';
  params: string = '?armyForge=true';
  factionMap: FactionMap[] = [
    { faction: Factions.Suarians, id: 'BubhE1kUpgYbqZvW~4' },
  ];

  cache = {};

  constructor(private http: HttpClient) {}

  getFaction(faction: Factions): Observable<Faction> {
    var factionId = this.factionMap.find((x) => x.faction == faction)?.id;
    var subject = new Subject<any>();

    this.http.get<any>(this.url + factionId + this.params).subscribe((resp) => {
      this.cache = resp;
      subject.next(resp);
    });

    return subject.asObservable();
  }
}
