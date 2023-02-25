import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Keyword } from '../models/keyword';
import { Faction } from '../models/faction';

@Injectable({
  providedIn: 'root',
})
export class KeywordService {
  url =
    'https://webapp.onepagerules.com/api/public/game-systems/age-of-fantasy/common-rules';

  cache: Keyword[] = [];
  nullObj: Keyword = { name: '', description: '', hasRating: false, id: -1 };
  constructor(private http: HttpClient) {}

  loadKeyWords(faction: Faction): Observable<boolean> {
    var subject = new Subject<boolean>();
    this.http.get<Keyword[]>(this.url).subscribe((resp) => {
      this.cache.push(...resp, ...faction.specialRules);
      subject.next(true);
    });
    return subject.asObservable();
  }

  getKeywordByName(name: string): Keyword {
    if (this.cache.length) {
      var item = this.cache.find(
        (x: Keyword) => x.name.toLowerCase() == name.toLowerCase()
      );
      return item ? item : this.nullObj;
    }
    console.error('Keywords are not loaded');
    return this.nullObj;
  }
}
