import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SortService {
  arrayToSort = [];

  constructor() {}

  populateArray() {
    this.arrayToSort = [];
    for (let i = 0; i < 100; i++) {
      this.arrayToSort.push(Math.ceil(Math.random() * 100));
    }
  }
}
