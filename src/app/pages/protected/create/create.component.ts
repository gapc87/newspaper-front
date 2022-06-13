import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewsService} from "../../../services/news.service";

import { UUID } from 'angular2-uuid';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  new: FormGroup = new FormGroup({
    newsUuid: new FormControl(UUID.UUID()),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  constructor(
    private newsService: NewsService,
    private router: Router,
    ) { }

  createNew() {
    this.new.markAllAsTouched();
    if (this.new.invalid) return;

    const { newsUuid, title, description } = this.new.value;

    this.newsService.createNew(newsUuid, title, description)
      .subscribe(() => {
        this.router.navigateByUrl('/dashboard');
        Swal.fire('¡Correcto!', 'Se creó una nueva noticia con éxito.', 'success');
      });
  }

  get title() { return this.new.get('title'); }
  get description() { return this.new.get('description'); }
}
