import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProtectedRoutingModule} from "./protected-routing.module";
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }
