import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RESTService } from '../../services/rest.service';

import { AddWordComponent } from './childs/addWord/addWord.component';
import { EditWordComponent } from './childs/editWord/editWord.component';
import { DeleteWordComponent } from './childs/deleteWord/deleteWord.component';
import { WordStatsComponent } from './childs/wordStats/wordStats.component';


@Component({
  selector: 'app-words-overview',
  templateUrl: './wordsOverview.component.html',
  styleUrls: []
})
export class WordsOverviewComponent implements OnInit {

  words: any;
  isDataReady = false;

  constructor(
    private restService: RESTService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getWords();
  }

  getWords() {
    this.restService.getWords()
    .subscribe(response => {
      this.words = response.words;
      this.words.forEach(element => {
        let success = 0;
        for (let i = 0; i < element.lessons.length; i++) {
          if (element.lessons[i].result === true) {
            success++;
          }
        }
        if (element.lessons.length === 0) {
          element.memorized = 0;
        } else {
          element.memorized = Math.round((success / element.lessons.length) * 100);
        }
      });
      this.isDataReady = true;
      },
    err => {
      console.log(JSON.stringify(err));
    });
  }

  addWord() {
    const modalRef = this.modalService.open(AddWordComponent, {size: 'lg'});
    modalRef.result.then(
      () => {
        this.getWords();
      },
      () => {}
    );
  }

  editWord(_id) {
    const modalRef = this.modalService.open(EditWordComponent, {size: 'lg'});
    modalRef.componentInstance._id = _id;
    modalRef.result.then(
      () => {
        this.getWords();
      },
      () => {}
    );
  }

  deleteWord(_id) {
    const modalRef = this.modalService.open(DeleteWordComponent, {size: 'lg'});
    modalRef.componentInstance._id = _id;
    modalRef.result.then(
      () => {
        this.getWords();
      },
      () => {}
    );
  }

  wordStats(_id) {
    const modalRef = this.modalService.open(WordStatsComponent, {size: 'lg'});
    modalRef.componentInstance._id = _id;
    modalRef.result.then(
      () => {
        this.getWords();
      },
      () => {}
    );
  }
}
