import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { INews } from '../interfaces/news/news.interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private firestore: AngularFirestore, private afStorage: AngularFireStorage) { }
  // Retrive news data from firestore
  getNews(): Observable<any> {
    return this.firestore.collection<INews>('News')
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as INews;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Store news data in firestore
  async createNews(news: INews, data: any): Promise<any>{
    return this.firestore.collection('News').add(news).then(async docRef => {
      news.id = docRef.id;
      news.urlImage = await this.uploadFile(docRef.id, data);
      this.UpdateNews(news, null);
    });
  }

  // Delete a record
  async deleteNews(newsId: string): Promise<void>{
    this.firestore.doc(`News/${newsId}`).delete();
    await this.afStorage.ref(`News/${newsId}`).delete();
  }

  // Update news data
  async UpdateNews(news: INews, data: any): Promise<void>{
    // delete news.id;
    if (data != null) {
      news.urlImage = await this.uploadFile(news.id, data);
    }
    this.firestore.collection('News').doc(news.id).update(news);
  }
  async uploadFile(id: string, data: any): Promise<any> {
    await this.afStorage.upload(`News/${id}`, data);
    return await this.afStorage.ref(`News/${id}`).getDownloadURL().toPromise();
  }
}
