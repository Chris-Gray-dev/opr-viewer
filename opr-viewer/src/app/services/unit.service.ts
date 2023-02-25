import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DisplayUnit } from '../models/display-unit';
import { Faction } from '../models/faction';
import { Keyword } from '../models/keyword';
import { KeywordKey } from '../models/keyword-key';
import { Query } from '../models/query';
import { FactionService } from './faction.service';
import { KeywordService } from './keyword.service';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  faction: Faction | undefined;

  constructor(
    private factionService: FactionService,
    private keywordService: KeywordService
  ) {}

  getUnit(unitQuery: Query): Observable<DisplayUnit> {
    var subject = new Subject<DisplayUnit>();
    this.factionService.getFaction(unitQuery.factionId).subscribe((faction) => {
      this.keywordService.loadKeyWords(faction).subscribe((_) => {
        var unit = this.getUnitFromFaction(unitQuery.name, faction);
        console.log(unit);

        if (unit) {
          subject.next({
            name: unit.name,
            defense: unit.defense,
            factionName: faction.name,
            quality: unit.quality,
            specialRules: unit.specialRules
              .map((rule: KeywordKey) =>
                this.keywordService.getKeywordByName(rule.name)
              )
              .filter((rule: Keyword) => rule.name),
            weapons: [],
            gameSystem: faction.fullname,
          });
        }
      });
    });
    return subject.asObservable();
  }

  private getUnitFromFaction(name: string, faction: Faction) {
    // modify name so it fits better
    return faction.units.find(
      (u) => u.name.toLowerCase() == name.toLowerCase()
    );
  }
}
