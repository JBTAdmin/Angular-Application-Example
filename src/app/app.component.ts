import { Component } from "@angular/core";
import { SpinnerService } from "./services/spinner.service";
import { LANGUAGE } from "./interfaces/language.interface";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Angular-Application-Example";
  loading$ = this.spinnerService.isLoading;
  languages = LANGUAGE;
  language = LANGUAGE[0].code;

  constructor(
    public spinnerService: SpinnerService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang(this.language);
    this.onLanguageChange();
  }

  onLanguageChange() {
    this.translate.use(this.language);
  }
}
