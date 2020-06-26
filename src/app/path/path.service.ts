import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PathService {
  constructor() {}

  generateGrid() {
    const visualContainer = document.querySelector(
      ".algo-visual"
    ) as HTMLElement;
    visualContainer.style.flexDirection = "column";
    // create 10 rows
    for (let i = 0; i < 10; i++) {
      let row = document.createElement("div");
      row.style.width = "100%";
      row.style.flex = "1";
      row.style.display = "flex";
      // create 10 columns
      for (let i = 0; i < 10; i++) {
        let col = document.createElement("div");
        col.style.flex = "1";
        col.style.backgroundColor = "#fff";
        col.style.borderRadius = "5px";
        col.style.margin = "1px";
        col.setAttribute("class", "col");
        col.style.cursor = "pointer";
        row.appendChild(col);
      }

      visualContainer.appendChild(row);
    }
  }
}
