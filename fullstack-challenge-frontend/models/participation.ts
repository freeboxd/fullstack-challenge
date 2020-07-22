import { ParticipationInterface } from '@/types';

export default class Participation implements ParticipationInterface {
  firstName: string;
  lastName: string;
  participation: number|null;
  constructor(firstName: string, lastName: string, participation: number|null) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.participation = participation;
  }
}
