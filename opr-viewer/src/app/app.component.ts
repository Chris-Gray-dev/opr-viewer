import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisplayUnit } from './models/display-unit';
import { Faction } from './models/faction';
import { Factions } from './models/factions';
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
  unit: DisplayUnit = {
    name: '',
    defense: 9,
    quality: 9,
    factionName: '',
    gameSystem: '',
    weapons: [],
    specialRules: [],
  };

  constructor(
    private queryService: QueryService,
    private unitService: UnitService
  ) {}

  ngOnInit() {
    this.queryService.getUnitFromQuery().subscribe((queryUnit) => {
      //this.unit = unit;
      this.unitService.getUnit(queryUnit).subscribe((unit) => {
        console.log(unit);
        this.unit = unit;
      });
    });
  }
}
