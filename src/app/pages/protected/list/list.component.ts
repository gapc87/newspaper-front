import { Component, OnInit } from '@angular/core';
import {New} from "../../../interfaces/interfaces";
import {NewsService} from "../../../services/news.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  news: New[] = [];

  editNewForm: FormGroup = new FormGroup({
    uuid: new FormControl(null),
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });

  showModal = false;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
     this.getNews();
  }

  private getNews() {
    this.newsService.allNews()
      .subscribe(resp => this.news = resp.news);
  }

  showEditModal(toEdit: New) {
    this.editNewForm.patchValue(toEdit);
    this.showModal = !this.showModal;
  }

  deleteNew(uuid: string) {
    this.newsService.deleteNew(uuid)
      .subscribe(() => this.getNews());
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  saveNew() {
    this.editNewForm.markAllAsTouched();
    if (this.editNewForm.invalid) return;

    const { uuid, title, description } = this.editNewForm.value;

    this.newsService.editNew(uuid, title, description)
      .subscribe(resp => {
        if (resp.ok === false) {
          Swal.fire('Error', 'Ocurrió un error al actualizar la noticia.', 'error');
        } else {
          this.getNews();
          this.toggleModal();
          Swal.fire('¡Correcto!', 'Se modificó la noticia con éxito', 'success');
        }
      });
  }

  get title() { return this.editNewForm.get('title'); }
  get description() { return this.editNewForm.get('description'); }
}
