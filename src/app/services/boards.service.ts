import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board, Card, Color } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  apiUrl = environment.API_URL;

  bufferSpace = 65535;

  backgroundColor$ = new BehaviorSubject<Color>('sky');

  constructor(private http: HttpClient) {}

  createBoard(title: string, backgroundColor: Color) {
    return this.http.post<Board>(
      `${this.apiUrl}/api/v1/boards/`,
      { title, backgroundColor },
      { context: checkToken() },
    );
  }

  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }

  getPosition(cards: Card[], currentIndex: number) {
    // new item
    if (cards.length === 1) {
      return this.bufferSpace;
    }

    // top item
    if (cards.length > 1 && currentIndex === 0) {
      const prevTopPosition = cards[1].position;
      return prevTopPosition / 2;
    }

    // middle item
    const lastIndex = cards.length - 1;
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) {
      const prevPosition = cards[currentIndex - 1].position;
      const nextPosition = cards[currentIndex + 1].position;
      return (prevPosition + nextPosition) / 2;
    }

    // bottom item
    if (cards.length > 1 && currentIndex === lastIndex) {
      const prevBottomPosition = cards[lastIndex - 1].position;
      return prevBottomPosition + this.bufferSpace;
    }

    return 0;
  }

  getPositionNewCard(cards: Card[]) {
    if (cards.length === 1) {
      return this.bufferSpace;
    }

    const lastIndex = cards.length - 1;
    const prevBottomPosition = cards[lastIndex].position;
    return prevBottomPosition + this.bufferSpace;
  }

  setBackgroundColor(color: Color) {
    this.backgroundColor$.next(color);
  }
}
