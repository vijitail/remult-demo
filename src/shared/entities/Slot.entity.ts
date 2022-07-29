import { Entity, Fields, IdEntity } from "remult";

@Entity("slots")
export class Slot extends IdEntity {
  @Fields.string()
  startTime: String;

  @Fields.string()
  endTime: String;
}
