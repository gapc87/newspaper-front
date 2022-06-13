import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  @Input() title!: string;
  @Input() description!: string;
}
