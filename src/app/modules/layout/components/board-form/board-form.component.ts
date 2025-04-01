import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { BoardsService } from '@services/boards.service';
import { Color } from '@models/index';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
})
export class BoardFormComponent {
  @Output() closeOverlay = new EventEmitter<boolean>();

  colors: Color[] = ['sky', 'yellow', 'green', 'red', 'violet', 'gray'];

  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    backgroundColor: new FormControl<Color>('red', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  faCheck = faCheck;

  constructor(
    private formBuilder: FormBuilder,
    private boardsService: BoardsService,
    private router: Router,
  ) {}

  doSave() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue();

      this.boardsService
        .createBoard(title, backgroundColor)
        .subscribe((board) => {
          this.closeOverlay.next(false);
          this.router.navigate(['/app/boards', board.id]);
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
