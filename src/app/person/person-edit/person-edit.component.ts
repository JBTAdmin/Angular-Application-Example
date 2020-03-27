import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { MessageService } from "../../services/message.service";
import { Person, calculateAge } from "../person";
import { PersonService } from "../person.service";
import { Gender } from "src/app/enums/gender.enum";
import { QUALIFICATIONS } from "../person-data";
import { Role } from "src/app/enums/role.enum";

@Component({
  templateUrl: "./person-edit.component.html",
  styleUrls: ["./person-edit.component.scss"]
})
export class PersonEditComponent {
  pageTitle = "Person Edit";
  personForm: FormGroup;
  person: Person;
  Gender = Gender;
  personRole = Role;
  qualifications = QUALIFICATIONS;
  @ViewChild("emailInput", { static: false }) emailInput;

  // productCategories = ProductData.ProductCategories;
  // productSuppliers = ProductData.ProductSuppliers;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;
  removable = true;
  selectable = true;
  maxDate: Date;
  calculatedAge: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private messageService: MessageService
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    const { person } = this.route.snapshot.data["person"];
    this.person = person || this.personService.initializePerson();
    this.calculatedAge = calculateAge(this.person.dob);
    this.createForm();
  }

  createForm(): void {
    this.personForm = this.formBuilder.group({
      name: [
        this.person.name,
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      address: [this.person.address, Validators.required],
      qualification: [this.person.qualification, [Validators.required]],
      gender: [this.person.gender, Validators.required],
      dob: [this.person.dob, Validators.required],
      age: { value: this.calculatedAge, disabled: true },
      personRoles: [this.person.personRoles, Validators.required],
      height: [this.person.height, Validators.required],
      email: [this.person.email || []],
      enteredEmail: [""]
    });
  }

  onDateChange(event) {
    if (event) {
      this.calculatedAge = calculateAge(event.value);
      this.personForm.get("age").enable();
      this.personForm.get("age").setValue(this.calculatedAge);
      this.personForm.get("age").disable();
    }
  }

  get emails() {
    return this.personForm.get("email");
  }

  get email() {
    return this.personForm.get("enteredEmail");
  }

  addEmail(event: MatChipInputEvent) {
    const value = this.email.value;

    // Add our fruit
    if ((value || "").trim() && this.email.valid) {
      this.emails.value.push(value);
      this.emails.markAsDirty();
    }

    this.email.reset();
  }

  remove(email: string): void {
    const index = this.emails.value.indexOf(email);
    if (index >= 0) {
      this.emails.value.splice(index, 1);
      this.emails.markAsDirty();
    }
  }

  deletePerson(): void {
    this.personService.deletePersonOnConfirm(this.person).then(response => {
      this.onSaveComplete();
    });
  }

  savePerson(): void {
    if (this.personForm.valid) {
      if (this.personForm.dirty) {
        const p = { ...this.person, ...this.personForm.value };

        if (p.id === 0) {
          this.personService.createPerson(p).subscribe(_ => {
            this.messageService.showMessage("PERSON.SAVED");
            this.onSaveComplete();
          });
        } else {
          this.personService.updatePerson(p).subscribe(_ => {
            this.messageService.showMessage("PERSON.UPDATED");
            this.onSaveComplete();
          });
        }
      } else {
        this.onSaveComplete();
      }
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.personForm.reset();
    this.router.navigate([""]);
  }
}
