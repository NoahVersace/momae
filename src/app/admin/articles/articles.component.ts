import { Component, OnInit } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference,
  DocumentData,
  DocumentChangeAction
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.scss"]
})
export class ArticlesComponent implements OnInit {
  db: AngularFirestore;
  articleCollection: AngularFirestoreCollection;
  articles: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.db = db;
    this.articleCollection = db.collection("artikel");

    this.articles = this.articleCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  ngOnInit() {
    console.log(this.articles);
  }

  deleteArticle(docId: string) {
    this.db
      .collection("artikel")
      .doc(docId)
      .delete();
  }
}
