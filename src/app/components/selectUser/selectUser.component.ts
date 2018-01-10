import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RESTService } from '../../services/rest.service';
import { UsersService } from '../../services/users.service';


import { AddUserComponent } from './childs/addUser/addUser.component';

@Component({
  selector: 'app-select-user',
  templateUrl: './selectUser.component.html',
  styleUrls: []
})
export class SelectUserComponent implements OnInit {

  users: any;
  isDataReady = false;

  constructor(
    private restService: RESTService,
    private modalService: NgbModal,
    private router: Router,
    private user: UsersService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.restService.getUsers()
    .subscribe(response => {
      this.users = response;
      this.isDataReady = true;
      },
    err => {
      console.log(JSON.stringify(err));
    });
  }

  addUser() {
    const modalRef = this.modalService.open(AddUserComponent, {size: 'lg'});
    modalRef.result.then(
      () => {
        this.getUsers();
      },
      () => {}
    );
  }

  selectUser(e, user_id) {
    e.preventDefault();
    e.stopPropagation();
    this.user.setUser(user_id);
    this.router.navigate(['/words-overview/']);
  }

}
