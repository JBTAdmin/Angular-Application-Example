import { Person } from "./person";
import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";
export class PersonData {
  static persons: Person[] = [
    {
      id: 1,
      name: "John",
      address: "USA",
      qualification: "MS",
      gender: Gender.Male,
      dob: new Date(1991, 1, 25),
      personRoles: [Role.Admin, Role.User],
      height: 5.8,
      email: ["john@admin.com"]
    },
    {
      id: 2,
      name: "Jo",
      address: "UK",
      qualification: "Bcom",
      gender: Gender.Male,
      dob: new Date(1991, 1, 25),
      personRoles: [Role.Admin],
      height: 5.8,
      email: ["jo@admin.com"]
    }
  ];
}

export const QUALIFICATIONS = ["M.S", "Bsc-IT", "BE", "Bcom"];
