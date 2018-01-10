import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RESTService } from '../../../../services/rest.service';


@Component({
  selector: 'app-word-stats',
  templateUrl: './wordStats.component.html',
  styleUrls: [],
})

export class WordStatsComponent  implements OnInit {

  isDataReady = false;

  @Input() _id;

  word: any;

  constructor(
    public activeModal: NgbActiveModal,
    private restService: RESTService) {}

  ngOnInit(): void {
    this.getWordData();
  }

  getWordData () {
    this.restService.getWord(this._id).subscribe(
      response => {
        this.word = response;
        this.isDataReady = true;
      },
      err => {
        console.log(JSON.stringify(err));
    });
  }

  clickClose () {
    this.activeModal.dismiss();
  }

}
