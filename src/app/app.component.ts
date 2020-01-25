import { Component, Output, EventEmitter } from "@angular/core";
import { SpinnerService } from "./services/spinner.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Angular-Application-Example";
  loading$ = this.spinnerService.isLoading;

  constructor(public spinnerService: SpinnerService) {}
}
