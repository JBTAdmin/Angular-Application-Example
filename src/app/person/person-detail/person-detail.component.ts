import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Person, calculateAge } from "../person";
import { PersonService } from "../person.service";

@Component({
  templateUrl: "./person-detail.component.html",
  styleUrls: ["./person-detail.component.scss"]
})
export class PersonDetailComponent {
  person: Person;
  calculatedAge: number;
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Use object destructuring to read the pieces of the resolved data.
    const { person } = this.route.snapshot.data["person"];
    this.person = person;
    this.calculatedAge = calculateAge(this.person.dob);
  }

  deletePerson(): void {
    this.personService.deletePersonOnConfirm(this.person).then(() => {
      this.router.navigate([""]);
    });
  }
}
