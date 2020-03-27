import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

import {
  ConfirmationDialogComponent,
  Confirmation
} from "../utitlity/confirmation/confirmation.component";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Person } from "./person";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  private personsUrl = "api/persons";

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  // Real http call can use this active, direction and pageIndex sort option
  getPersons(
    active: string,
    direction: string,
    pageIndex: number
  ): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http.get(this.personsUrl, { headers }).pipe(
      map((data: Person[]) => {
        // Mocked pagination result object
        return {
          totalCount: data.length,
          items: data || []
        };
      }),
      tap(data => console.log(JSON.stringify(data))),
      catchError(error => throwError(error))
    );
  }

  getPerson(id: number): Observable<Person> {
    if (id === 0) {
      return of(this.initializePerson());
    }
    const url = `${this.personsUrl}/${id}`;
    return this.http.get<Person>(url).pipe(
      tap(data => console.log("getPerson: " + JSON.stringify(data))),
      catchError(error => throwError(error))
    );
  }

  createPerson(person: Person): Observable<Person> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    person.id = null;
    return this.http
      .post<Person>(this.personsUrl, person, { headers })
      .pipe(
        tap(data => console.log("createPerson: " + JSON.stringify(data))),
        catchError(error => throwError(error))
      );
  }

  deletePerson(id: number): Observable<{}> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.personsUrl}/${id}`;
    return this.http
      .delete<Person>(url, { headers })
      .pipe(
        tap(data => console.log("deletePerson: " + id)),
        catchError(error => throwError(error))
      );
  }

  updatePerson(person: Person): Observable<Person> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.personsUrl}/${person.id}`;
    return this.http
      .put<Person>(url, person, { headers })
      .pipe(
        tap(() => console.log("updatePerson: " + person.id)),
        // Return the Person on an update
        map(() => person),
        catchError(error => throwError(error))
      );
  }

  deletePersonOnConfirm(person: Person) {
    return new Promise((resolve, reject) => {
      if (person.id === 0) {
        // Don't delete, it was never saved.
        resolve(true);
      } else {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: "250px",
          data: {
            message:
              this.translate.instant("PERSON.DELETE.CONFIRMATION") +
              `: ${person.name}?`
          } as Confirmation
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.deletePerson(person.id).subscribe({
              next: () => {
                const deleteConfirmation = this.translate.instant(
                  "PERSON.DELETED"
                );
                this.snackBar.open(deleteConfirmation, null, {
                  duration: 2000
                });
                resolve(true);
              },
              error: err => {
                reject(false);
              }
            });
          }
        });
      }
    });
  }

  public initializePerson(): Person {
    // Return an initialized object
    return {
      id: 0,
      address: "",
      dob: null,
      email: null,
      gender: null,
      height: null,
      name: null,
      personRoles: null,
      qualification: null
    };
  }
}
