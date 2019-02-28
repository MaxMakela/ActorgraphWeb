import { Component, OnInit } from '@angular/core';
import {allActors} from '../../../actors.js';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  actors = allActors;
  firstActorName = "";
  secondActorName = "";

  firstActor = "";
  secondActor = "";
  constructor() { }

  ngOnInit() {
  }

  searchActor(name: string): string {
    return this.actors.some(function(el) {return el.Name === name;}) ? this.actors.find(x => x.Name == name).id : "";
  }

  submitForm() {
    console.log(this.firstActorName, this.secondActorName);

    this.firstActor = this.searchActor(this.firstActorName);
    this.secondActor = this.searchActor(this.secondActorName);
  }

}
