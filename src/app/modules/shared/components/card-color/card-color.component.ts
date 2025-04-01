import { Component, Input } from '@angular/core';
import { Color, COLORS } from '@models/index';

@Component({
  selector: 'card-color',
  templateUrl: './card-color.component.html',
})
export class CardColorComponent {
  @Input() color: Color = 'sky';

  constructor() {}

  mapColors = COLORS;

  get colors() {
    const classes = this.mapColors[this.color];

    return classes ? classes : {};
  }
}
