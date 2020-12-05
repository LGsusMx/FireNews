import { Component, Input, OnInit } from '@angular/core';
import { INews } from 'src/app/interfaces/news/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-listcard',
  templateUrl: './listcard.component.html',
  styleUrls: ['./listcard.component.css']
})
export class ListcardComponent implements OnInit {
  @Input() news: INews;
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
  }
  delete(item): void {
    this.newsService.deleteNews(item);
  }
  update(newsn): void{
    console.log(newsn);
  }
}
