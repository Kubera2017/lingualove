import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RESTService } from '../../../../services/rest.service';


@Component({
  selector: 'app-add-woruserd',
  templateUrl: './addUser.component.html',
  styleUrls: [],
})

export class AddUserComponent {

  user = {name: ''};

  constructor(
    public activeModal: NgbActiveModal,
    private restService: RESTService) {}

  clickSave () {
    this.restService.addUser(this.user).subscribe(
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
