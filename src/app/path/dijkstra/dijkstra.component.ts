import { Component, OnInit } from "@angular/core";
import { PathService } from "../path.service";

@Component({
  selector: "app-dijkstra",
  templateUrl: "./dijkstra.component.html",
  styleUrls: ["./dijkstra.component.css"],
})
export class DijkstraComponent implements OnInit {
  constructor(private pathService: PathService) {}

  ngOnInit() {
    this.pathService.generateGrid();
  }
}
