import { Injectable } from "@angular/core";
import { parse } from "querystring";

@Injectable({
  providedIn: "root",
})
export class PathService {
  matrix = [];
  start = [0, 0];
  finish = [24, 24];
  nodeToMove;

  constructor() {}

  generateGrid() {
    const visualContainer = document.querySelector(
      ".algo-visual"
    ) as HTMLElement;
    visualContainer.style.flexDirection = "column";
    // create 10 rows
    for (let i = 0; i < 25; i++) {
      let row = document.createElement("div");
      row.style.width = "100%";
      row.style.display = "flex";
      row.style.flex = "1";
      let matrixRow = [];
      // create 10 columns
      for (let j = 0; j < 25; j++) {
        let col = document.createElement("div");
        col.style.flex = "1";
        col.style.backgroundColor = "#fff";
        col.style.borderRadius = "4px";
        col.style.margin = "1px";
        col.style.border = "1px solid #fff";
        col.setAttribute("class", "col");
        col.setAttribute("id", i + "-" + j);
        col.style.cursor = "pointer";
        col.style.display = "flex";

        col.addEventListener("drop", (event) => {
          this.drop(event);
        });
        col.addEventListener("dragover", (event) => {
          this.allowDrop(event);
        });
        col.addEventListener("mouseenter", (event) => {
          if (event.buttons === 1) {
            const el = event.target as HTMLElement;
            if (el.childElementCount === 0) {
              let indeces = el.id.split("-").map((x) => parseInt(x));
              this.matrix[indeces[0]][indeces[1]] = null;
              el.style.backgroundColor = "black";
              el.classList.add("wall");
            }
          }
        });
        col.addEventListener("mousedown", (event) => {
          const el = event.target as HTMLElement;
          if (el.childElementCount === 0) {
            let indeces = el.id.split("-").map((x) => parseInt(x));
            this.matrix[indeces[0]][indeces[1]] = null;
            el.style.backgroundColor = "black";
            el.classList.add("wall");
          }
        });

        if (i === 0 && j === 0) {
          matrixRow.push(0);
          let img = document.createElement("img");
          img.style.maxWidth = "100%";
          img.style.maxHeight = "100%";
          img.style.margin = "auto";
          img.setAttribute("src", "./assets/imgs/start.png");
          img.setAttribute("id", "start");
          img.draggable = true;
          img.addEventListener("dragstart", (event) => {
            this.drag(event);
          });
          col.appendChild(img);
        } else {
          matrixRow.push(1);
        }

        if (i === 24 && j === 24) {
          let img = document.createElement("img");
          img.style.maxWidth = "100%";
          img.style.maxHeight = "100%";
          img.style.margin = "auto";
          img.setAttribute("src", "./assets/imgs/finish.png");
          img.setAttribute("id", "finish");
          img.addEventListener("dragstart", (event) => {
            this.drag(event);
          });
          col.appendChild(img);
        }

        row.appendChild(col);
      }
      this.matrix.push(matrixRow);
      visualContainer.appendChild(row);
    }
  }

  startDijkstra() {
    let visited = [];

    setInterval(() => {}, 1000);
    setInterval(() => {}, 1000);
  }

  private allowDrop(ev) {
    ev.preventDefault();
  }

  private drag(ev) {
    let el = ev.target as HTMLElement;
    this.nodeToMove = el.id;
    ev.dataTransfer.setData("text", ev.target.id);
  }

  private drop(ev) {
    let el = ev.target as HTMLElement;
    ev.preventDefault();
    if (
      !el.classList.contains("wall") &&
      el.id !== "start" &&
      el.id !== "finish"
    ) {
      if (this.nodeToMove === "start") {
        this.matrix[this.start[0]][this.start[1]] = 1;
        this.start = el.id.split("-").map((x) => parseInt(x));
        this.matrix[this.start[0]][this.start[1]] = 0;
      } else {
        this.finish = el.id.split("-").map((x) => parseInt(x));
      }
      this.nodeToMove = undefined;
      console.log(this.matrix);
      console.log(this.start);
      console.log(this.finish);

      let data = ev.dataTransfer.getData("text");
      let img = document.getElementById(data) as HTMLElement;
      ev.target.appendChild(img);
    }
  }
}
