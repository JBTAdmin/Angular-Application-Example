import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { PersonResolved } from "../person";
import { PersonService } from "../person.service";

@Injectable({
  providedIn: "root"
})
export class PersonResolver implements Resolve<PersonResolved> {
  constructor(private personService: PersonService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PersonResolved> {
    const id = route.paramMap.get("id");
    if (isNaN(+id)) {
      const message = `Person id was not a number: ${id}`;
      return of({ person: null, error: message });
    }

    return this.personService.getPerson(+id).pipe(
      map(person => ({ person: person })),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        return of({ person: null, error: message });
      })
    );
  }
}
