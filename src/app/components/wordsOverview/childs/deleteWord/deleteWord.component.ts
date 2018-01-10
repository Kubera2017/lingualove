import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';

import { RESTService } from '../../../../services/rest.service';

@Component({
  selector: 'app-delete-word',
  templateUrl: './deleteWord.component.html',
  styleUrls: [],
})

export class DeleteWordComponent implements OnInit {

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

  clickOk () {
    this.restService.deleteWord(this._id).subscribe(
      response => {
        this.activeModal.close('Deleted');
      },
      err => {
        console.log(JSON.stringify(err));
    });
  }

  clickCancel () {
    this.activeModal.dismiss();
  }

}
