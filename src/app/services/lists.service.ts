import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { CreateListDto, List } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  apiUrl = environment.API_URL;

  bufferSpace = 65535;

  constructor(private http: HttpClient) {}

  create(dto: CreateListDto) {
    return this.http.post<List>(`${this.apiUrl}/api/v1/lists`, dto, {
      context: checkToken(),
    });
  }

  getPositionNewList(lists: List[]) {
    if (lists.length === 1) {
      return this.bufferSpace;
    }

    const lastIndex = lists.length - 1;
    const prevBottomPosition = lists[lastIndex].position;
    return prevBottomPosition + this.bufferSpace;
  }
}
