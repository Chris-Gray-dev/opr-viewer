import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { range } from 'rxjs';
import { DisplayUnit } from './models/display-unit';
import { Faction } from './models/faction';
import { Factions } from './models/factions';
import { KeywordDisplay } from './models/keyword';
import { Query } from './models/query';
import { FactionService } from './services/faction.service';
import { KeywordService } from './services/keyword.service';
import { QueryService } from './services/query.service';
import { UnitService } from './services/unit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'opr-viewer';
  loaded = false;

  weaponColumns = ['name', 'attacks', 'range', 'Armor Penetration', 'Special'];

  spellColumns = ['Spell', 'Description'];

  combinedRules: KeywordDisplay[] = [];

  unit: DisplayUnit = {
    name: '',
    defense: 9,
    quality: 9,
    factionName: '',
    gameSystem: '',
    weapons: [],
    specialRules: [],
    spells: [],
  };

  data: any = [];

  constructor(
    private queryService: QueryService,
    private unitService: UnitService
  ) {}

  ngOnInit() {
    this.queryService.getUnitFromQuery().subscribe((queryUnit) => {
      this.unitService.getUnit(queryUnit).subscribe((unit) => {
        console.log(unit);
        this.unit = unit;

        this.combinedRules.push(...this.unit.specialRules);
        var rulesFromWeapons = this.unit.weapons.flatMap((w) => w.special);
        this.combinedRules.push(...rulesFromWeapons);
        if (this.unit.extraRules) {
          this.combinedRules.push(...this.unit.extraRules);
        }
        this.combinedRules = [...new Set(this.combinedRules)];
        this.combinedRules.sort((a, b) => a.name.localeCompare(b.name));
        this.loaded = true;
      });
    });
  }
}
