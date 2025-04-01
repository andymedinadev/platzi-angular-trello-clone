import { Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Color, COLORS } from '@models/color.model';

@Component({
  selector: 'app-btn',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
  @Input() color: Color = 'primary';

  faSpinner = faSpinner;
  mapColors = COLORS;

  constructor() {}

  get colors() {
    const classes = this.mapColors[this.color];

    return classes ? classes : {};
  }
}
