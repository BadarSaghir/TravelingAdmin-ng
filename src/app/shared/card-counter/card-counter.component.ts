import { Component, OnInit } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";

@Component({
  selector: "app-card-counter",
  templateUrl: "./card-counter.component.html",
  styleUrls: ["./card-counter.component.css"],
})
export class CardCounterComponent implements OnInit {
  constructor(public fireStore: Firestore) {}

  ngOnInit(): void {}
}
