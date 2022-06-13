import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../services/news.service";
import {New} from "../../interfaces/interfaces";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  news: New[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.allNews();
  }

  allNews() {
    this.newsService.allNews()
      .subscribe(resp => {
        this.news = resp.news;
      });
  }
}
