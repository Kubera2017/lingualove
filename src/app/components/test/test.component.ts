import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RESTService } from '../../services/rest.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: []
})
export class TestComponent implements OnInit {

  wordSet: any;
  i = 0;
  answer: any;
  state: any;

  constructor(
    private restService: RESTService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restService.getWordSet()
    .subscribe(response => {
      this.wordSet = response;
      this.state = 'TestMode';
      },
    err => {
      console.log(JSON.stringify(err));
    });
  }

  clickNext() {
    this.wordSet[this.i].answer = this.answer;
    if (this.answer === this.wordSet[this.i].translation) {
      const lesson = {
        date: Date(),
        result: true
      };
      this.restService.writeResult(this.wordSet[this.i]._id, lesson)
      .subscribe();
    } else {
      const lesson = {
        date: Date(),
        result: false
      };
      this.restService.writeResult(this.wordSet[this.i]._id, lesson)
      .subscribe();
    }
    this.answer = undefined;
    if (this.i === (this.wordSet.length - 1)) {
      this.state = 'Results';
    } else {
      this.i++;
    }
  }

  isCorrect(word) {
    if (word.answer === word.translation) {
      return '';
    } else {
      return 'bg-warning';
    }
  }

  finish () {
    this.router.navigate(['/']);
  }




}
