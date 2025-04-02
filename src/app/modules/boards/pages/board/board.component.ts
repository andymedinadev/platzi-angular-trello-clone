import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import { BoardsService } from '@services/boards.service';
import { CardsService } from '@services/cards.service';
import { ListsService } from '@services/lists.service';
import { BACKGROUNDS, Board, Card, List } from '@models/index';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit, OnDestroy {
  board: Board | null = null;

  showListForm = false;

  faClose = faClose;

  inputCard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  inputList = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  colorBackgrounds = BACKGROUNDS;

  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private cardsService: CardsService,
    private listsService: ListsService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('boardId');

      if (id) {
        this.getBoard(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.boardsService.setBackgroundColor('sky');
  }

  private getBoard(id: Board['id']) {
    this.boardsService.getBoard(id).subscribe((board) => {
      this.board = board;
      this.boardsService.setBackgroundColor(this.board.backgroundColor);
    });
  }

  private updateCard(card: Card, position: number, listId: string | number) {
    this.cardsService
      .update(card.id, { position, listId })
      .subscribe((cardUpdated) => console.log(cardUpdated));
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    // calculations after drop
    const cardPosition = this.boardsService.getPosition(
      event.container.data,
      event.currentIndex,
    );

    const card = event.container.data[event.currentIndex];

    const listId = event.container.id;

    this.updateCard(card, cardPosition, listId);
  }

  addList() {
    const title = this.inputList.value;

    if (this.board) {
      this.listsService
        .create({
          title,
          boardId: this.board.id,
          position: this.listsService.getPositionNewList(this.board.lists),
        })
        .subscribe((list) => {
          this.board?.lists.push({
            ...list,
            cards: [],
          });
          this.showListForm = false;
          this.inputList.setValue('');
        });
    }
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: card,
      },
    });
    dialogRef.closed.subscribe((output) => {
      console.log(output);
    });
  }

  createCard(list: List) {
    const title = this.inputCard.value;

    if (this.board) {
      this.cardsService
        .create({
          title,
          listId: list.id,
          boardId: this.board.id,
          position: this.boardsService.getPositionNewCard(list.cards),
        })
        .subscribe((card) => {
          list.cards.push(card);
          this.inputCard.setValue('');
          list.showCardForm = false;
        });
    }
  }

  openFormCard(list: List) {
    if (this.board?.lists) {
      this.board.lists = this.board.lists.map((iteratorList) => ({
        ...iteratorList,
        showCardForm: iteratorList.id === list.id,
      }));
    }
  }

  closeCardForm(list: List) {
    list.showCardForm = false;
  }

  get colors() {
    if (this.board) {
      const classes = this.colorBackgrounds[this.board.backgroundColor];
      return classes ? classes : {};
    }
    return {};
  }
}
