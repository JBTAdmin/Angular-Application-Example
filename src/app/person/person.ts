import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";

export const calculateAge = birthday => {
  // birthday is a date
  birthday = new Date(birthday);

  if (birthday && birthday instanceof Date) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
};

/* Defines the person entity */
export class Person {
  id: number;
  name: string;
  qualification?: string;
  address: string;
  dob: Date;
  gender: Gender;
  personRoles: Role[];
  height: number;
  email: string[];
}

export interface PersonResult {
  totalCount: number;
  items: Person[];
}

export interface PersonResolved {
  person: Person;
  error?: any;
}
