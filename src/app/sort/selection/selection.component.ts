import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-selection",
  templateUrl: "./selection.component.html",
  styleUrls: ["./selection.component.css"],
})
export class SelectionComponent implements OnInit {
  arrayToSort = [];

  constructor() {}

  ngOnInit() {
    // Populate the array to sort
    for (let i = 0; i < 100; i++) {
      this.arrayToSort.push(Math.ceil(Math.random() * 100));
    }
  }
}
