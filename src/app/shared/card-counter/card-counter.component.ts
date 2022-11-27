import { Component, OnInit } from "@angular/core";
import { FireStoreService } from "src/app/services/firebase/firestore.service";

@Component({
  selector: "app-card-counter",
  templateUrl: "./card-counter.component.html",
  styleUrls: ["./card-counter.component.css"],
})
export class CardCounterComponent implements OnInit {
  constructor(public fireStore: FireStoreService) {}

  ngOnInit(): void {}
}
