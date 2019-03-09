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

  test_levenshtein = 0;

  firstActor = "";
  secondActor = "";
  constructor() { }

  ngOnInit() {
  }

  levenshtein (s1, s2) {
    if (s1 == s2) {
      return 0;
    }
  
    var s1_len = s1.length;
    var s2_len = s2.length;
    if (s1_len === 0) {
      return s2_len;
    }
    if (s2_len === 0) {
      return s1_len;
    }
  
    // BEGIN STATIC
    var split = false;
    try {
      split = !('0')[0];
    } catch (e) {
      // Earlier IE may not support access by string index
      split = true;
    }
    // END STATIC
    if (split) {
      s1 = s1.split('');
      s2 = s2.split('');
    }
  
    var v0 = new Array(s1_len + 1);
    var v1 = new Array(s1_len + 1);
  
    var s1_idx = 0,
      s2_idx = 0,
      cost = 0;
    for (s1_idx = 0; s1_idx < s1_len + 1; s1_idx++) {
      v0[s1_idx] = s1_idx;
    }
    var char_s1 = '',
      char_s2 = '';
    for (s2_idx = 1; s2_idx <= s2_len; s2_idx++) {
      v1[0] = s2_idx;
      char_s2 = s2[s2_idx - 1];
  
      for (s1_idx = 0; s1_idx < s1_len; s1_idx++) {
        char_s1 = s1[s1_idx];
        cost = (char_s1 == char_s2) ? 0 : 1;
        var m_min = v0[s1_idx + 1] + 1;
        var b = v1[s1_idx] + 1;
        var c = v0[s1_idx] + cost;
        if (b < m_min) {
          m_min = b;
        }
        if (c < m_min) {
          m_min = c;
        }
        v1[s1_idx + 1] = m_min;
      }
      var v_tmp = v0;
      v0 = v1;
      v1 = v_tmp;
    }
    return v0[s1_len];
  } 

  mistakesFix(searchingName){
    return this.actors.some(function(el) {return this.levenshtein(el.Name, searchingName) <= 3;});
  }

  getNameVariants(search) {
        var values = [];
        this.actors.forEach(function(item) {
          if (this.levenshtein(item.Name, search)<=3) {
            values.push(item.Name);
          }
        });
        return values;
    };
    

  searchActor(name: string): string {
    return this.actors.some(function(el) {return el.Name == name;}) ? this.actors.find(x => x.Name == name).id : "";
    //  this.levenshtein(el.Name, name) < 3
  }

  submitForm() {
    console.log(this.firstActorName, this.secondActorName);
    this.firstActor = this.searchActor(this.firstActorName);
    this.secondActor = this.searchActor(this.secondActorName);
    this.test_levenshtein = this.levenshtein(this.firstActorName, this.secondActorName);
    
    console.log(this.mistakesFix(this.firstActorName));
    console.log(this.getNameVariants(this.firstActorName));
  }

}
