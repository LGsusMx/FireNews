import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INews } from 'src/app/interfaces/news/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {
  newsL: INews[] = [];
  constructor(private newsService: NewsService) { }
  ngOnInit(): void {
    this.newsService.getNews().subscribe(data => data.forEach(news => this.newsL.push(news)));
    console.log(this.newsL);
  }

}
