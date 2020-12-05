import { Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { title } from 'process';
import { INews } from 'src/app/interfaces/news/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-modal-addereso',
  templateUrl: './modal-addereso.component.html',
  styleUrls: ['./modal-addereso.component.css']
})
export class ModalAdderesoComponent implements OnInit {
  showModal: boolean;
  @Input() editable: INews = null;
  form: FormGroup;
  file: File;
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.showModal = false;
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      bodyF: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
    });
    this.form.setValue({title: this.editable.title, bodyF: this.editable.bodyF, author: this.editable.author});
  }

  onEventButtons(event: boolean): void {
    if (event && this.editable != null) {
      this.onRegister();
    }else{if(event){
      this.updateRegister();
    }}
    this.showModal = false;
    this.form.reset();
  }

  onRegister(): void {
    if (this.form.valid) {
      this.newsService.createNews(this.form.value, this.file);
    }
  }

  updateRegister(): void{
    if (this.form.valid) {
      this.newsService.UpdateNews(this.form.value, this.file);
    }
  }

  processFile(imageInput: any): void {
    this.file = imageInput.files[0];
  }

}
