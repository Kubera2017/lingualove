import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RESTService } from './services/rest.service';
import { UsersService } from './services/users.service';


import { AppComponent } from './components/_main/app.component';

import { OrderByPipe } from './pipes/orderBy.pipe';

import { TopNavigationComponent } from './components/topNavigation/topNavigation.component';
import { WordsOverviewComponent } from './components/wordsOverview/wordsOverview.component';
import { AddWordComponent } from './components/wordsOverview/childs/addWord/addWord.component';
import { EditWordComponent } from './components/wordsOverview/childs/editWord/editWord.component';
import { DeleteWordComponent } from './components/wordsOverview/childs/deleteWord/deleteWord.component';
import { WordStatsComponent } from './components/wordsOverview/childs/wordStats/wordStats.component';
import { TestComponent } from './components/test/test.component';
import { SelectUserComponent } from './components/selectUser/selectUser.component';
import { AddUserComponent } from './components/selectUser/childs/addUser/addUser.component';




const appRoutes: Routes = [
  {
    path: 'words-overview',
    component: WordsOverviewComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: '**',
    component: SelectUserComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TopNavigationComponent,
    WordsOverviewComponent,
    AddWordComponent,
    EditWordComponent,
    DeleteWordComponent,
    WordStatsComponent,
    TestComponent,
    SelectUserComponent,
    AddUserComponent,

    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  entryComponents: [
    AddWordComponent,
    EditWordComponent,
    DeleteWordComponent,
    WordStatsComponent,
    AddUserComponent
  ],
  providers: [
    RESTService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
