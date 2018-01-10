import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RESTService } from '../../../../services/rest.service';


@Component({
  selector: 'app-add-word',
  templateUrl: './addWord.component.html',
  styleUrls: [],
})

export class AddWordComponent {

  word = {name: '', translation: ''};

  constructor(
    public activeModal: NgbActiveModal,
    private restService: RESTService) {}

  clickSave () {
    this.restService.addWord(this.word).subscribe(
      response => {
        this.activeModal.close('Created');
      },
      err => {
        console.log(JSON.stringify(err));
      });
  }

  clickCancel () {
    this.activeModal.dismiss();
  }

}
