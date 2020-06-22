import { Component, OnInit } from "@angular/core";
import { SortService } from "../sort.service";

@Component({
  selector: "app-selection",
  templateUrl: "./selection.component.html",
  styleUrls: ["./selection.component.css"],
})
export class SelectionComponent implements OnInit {
  arrayToSort = [];

  constructor(private sortService: SortService) {}

  ngOnInit() {
    // Populate the array to sort
    for (let i = 0; i < 100; i++) {
      this.arrayToSort.push(Math.ceil(Math.random() * 100));
    }

    this.generateBars();
  }

  onSelectionSort() {
    let allBars = document.querySelectorAll(".bar");
    let barCount = this.arrayToSort.length;

    for (let i = 0; i < barCount - 1; i++) {
      setTimeout(() => {
        let minIndex = i;
        // let currentBarToCheck = allBars[minIndex] as HTMLElement;
        // currentBarToCheck.style.backgroundColor = "red";
        setTimeout(() => {
          for (let j = i + 1; j < barCount; j++) {
            let currentBarToCheck = allBars[j] as HTMLElement;
            currentBarToCheck.style.backgroundColor = "red";
            if (this.arrayToSort[j] < this.arrayToSort[minIndex]) {
              minIndex = j;
            }
          }
          let temp = this.arrayToSort[minIndex];
          this.arrayToSort[minIndex] = this.arrayToSort[i];
          this.arrayToSort[i] = temp;
          this.generateBars();
        }, i * 110);
      }, i * 100);
    }
  }

  private generateBars() {
    // get the element that will contain the algorithm animation
    const visualContainer = document.querySelector(
      ".algo-visual"
    ) as HTMLElement;
    // Clear the elements inside
    // This is needed because this function will be called in each iteration of the sort
    visualContainer.innerHTML = "";
    // Add the sort button
    var sortButton = document.createElement("button");
    sortButton.innerHTML = "Sort";
    sortButton.style.position = "absolute";
    sortButton.style.top = "5px";
    sortButton.style.left = "5px";
    sortButton.addEventListener("click", () => {
      this.onSelectionSort();
    });
    visualContainer.appendChild(sortButton);
    // Loop through the array to sort and create a div element
    // based on the random value
    this.arrayToSort.forEach((size) => {
      const bar = document.createElement("div");
      bar.style.height =
        Math.floor((size / 100) * visualContainer.clientHeight) + "px";
      bar.style.width = "10px";
      bar.style.marginLeft = "2px";
      bar.style.marginRight = "2px";
      bar.style.backgroundColor = "#428df5";
      bar.setAttribute("class", "bar");
      visualContainer.appendChild(bar);
    });
  }
}
