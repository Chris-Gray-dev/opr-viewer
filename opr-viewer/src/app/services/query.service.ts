import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(private route: ActivatedRoute) {}

  testObj = {
    name: 'Suarian Warrior',
  };

  getUnitFromQuery(): Observable<Query> {
    var subject = new Subject<Query>();
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      subject.next(params as Query);
    });

    return subject.asObservable();
  }
}
