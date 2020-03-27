import { Component, ViewChild } from "@angular/core";
import { merge } from "rxjs";
import { switchMap, startWith, map } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { PersonService } from "../person.service";
import { Person, PersonResult } from "../person";

@Component({
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.scss"]
})
export class PersonListComponent {
  public pageTitle = "Person List";

  displayedColumns: string[] = ["id", "name", "gender", "email"];
  persons: Person[] = [];
  totalCount: number = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private personService: PersonService) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const { active, direction } = this.sort;
          const pageIndex = this.paginator.pageIndex;

          return this.personService.getPersons(active, direction, pageIndex);
        }),
        map((data: PersonResult) => {
          this.totalCount = data.totalCount;
          return data.items;
        })
      )
      .subscribe((persons: Person[]) => (this.persons = persons));
  }
}
