import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailArticleComponent } from "./detail-article/detail-article.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { AdminComponent } from "./admin/admin.component";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo
} from "@angular/fire/auth-guard";
import { LoginComponent } from "./admin/login/login.component";
import { ArticlesComponent } from "./admin/articles/articles.component";
import { ArticleNewComponent } from "./admin/articles/article-new/article-new.component";
import { ArticleEditComponent } from "./admin/articles/article-edit/article-edit.component";
import { ReservationsComponent } from "./admin/reservations/reservations.component";
import { ReservationEditComponent } from "./admin/reservations/reservation-edit/reservation-edit.component";

const redirectToCatalog = () => redirectUnauthorizedTo(["/"]);

export const routes: Routes = [
  {
    path: "detail-article",
    component: DetailArticleComponent
  },
  {
    path: "",
    component: CatalogComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToCatalog },
    children: [
      {
        path: "",
        component: ArticlesComponent
      },
      {
        path: "articles/new",
        component: ArticleNewComponent
      },
      {
        path: "articles/edit/:id",
        component: ArticleEditComponent
      },
      {
        path: "reservations",
        component: ReservationsComponent
      },
      {
        path: "reservations/edit/:id",
        component: ReservationEditComponent
      }
    ]
  },
  {
    path: "admin/login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
