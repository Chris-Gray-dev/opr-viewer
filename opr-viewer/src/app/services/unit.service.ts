import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DisplayUnit } from '../models/display-unit';
import { Equipment } from '../models/equipment';
import { Faction } from '../models/faction';
import { Keyword, KeywordDisplay } from '../models/keyword';
import { KeywordKey } from '../models/keyword';
import { Query } from '../models/query';
import { Weapon } from '../models/weapon';
import { FactionService } from './faction.service';
import { KeywordService } from './keyword.service';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  faction: Faction | undefined;
  AP = 'ap';
  WIZARD = 'Wizard';

  constructor(
    private factionService: FactionService,
    private keywordService: KeywordService
  ) {}

  getUnit(unitQuery: Query): Observable<DisplayUnit> {
    var subject = new Subject<DisplayUnit>();
    this.factionService.getFaction(unitQuery.factionId).subscribe((faction) => {
      this.keywordService.loadKeyWords(faction).subscribe((_) => {
        var unit = this.getUnitFromFaction(unitQuery.name, faction);

        if (unit) {
          var returnUnit: DisplayUnit = {
            name: unit.name,
            defense: unit.defense,
            factionName: faction.name,
            quality: unit.quality,
            specialRules: unit.specialRules
              .map((rule: KeywordKey) => {
                var r = this.keywordService.getKeywordByName(rule.name);
                let x: KeywordDisplay = {
                  description: r.description,
                  name: r.name,
                  hasRating: r.hasRating,
                  rating: rule.rating ? Number(rule.rating) : undefined,
                };
                return x;
              })
              .filter((rule: KeywordDisplay) => rule.name),
            weapons: unit.equipment.map((equipment: Equipment) =>
              this.convertEquipmentToWeapon(equipment)
            ),
            gameSystem: faction.fullname,
          };

          // Apply upgrades

          // Apply spells
          if (returnUnit.specialRules.find((sr) => sr.name == this.WIZARD)) {
            returnUnit.spells = faction.spells;
            returnUnit.extraRules = [];
            returnUnit.extraRules.push(
              ...returnUnit.spells.flatMap((s) =>
                this.keywordService.checkForKeywords(s.effect)
              )
            );
          }

          subject.next(returnUnit);
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

  private convertEquipmentToWeapon(equipment: Equipment): Weapon {
    var ap = equipment.specialRules.find((s) => s.key == this.AP)?.rating;
    var returnAp = 0;
    if (ap) {
      returnAp = Number(ap);
      equipment.specialRules = equipment.specialRules.filter(
        (s) => (s.key = this.AP)
      );
    }

    return {
      name: equipment.name,
      attacks: equipment.attacks,
      range: equipment.range,
      armorPen: returnAp,
      special: equipment.specialRules.map((rule: KeywordKey) =>
        this.keywordService.getKeywordByName(rule.name)
      ),
    };
  }
}
