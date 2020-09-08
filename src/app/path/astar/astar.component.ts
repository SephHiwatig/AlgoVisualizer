import { Component, OnInit } from "@angular/core";
import { PathService } from "../path.service";

@Component({
  selector: "app-astar",
  templateUrl: "./astar.component.html",
  styleUrls: ["./astar.component.css", "../path.style.css"],
})
export class AstarComponent implements OnInit {
  constructor(private pathService: PathService) {}

  ngOnInit() {
    this.pathService.generateGrid();
  }

  onSearch() {
    this.pathService.startAStar();
  }
}
