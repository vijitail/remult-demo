import { Entity, Fields, IdEntity, Validators, isBackend } from "remult";
import { createMeeting } from "../../server/calendar";
import { BookingsController } from "../controllers/Booking.controller";

@Entity("bookings", {
  allowApiCrud: true,
  saved: async (booking: Booking) => {
    if (isBackend()) await BookingsController.createMeeting();
  },
})
export class Booking extends IdEntity {
  @Fields.string({
    validate: Validators.required,
  })
  name: String;

  @Fields.string({
    validate: Validators.required,
  })
  email: String;

  @Fields.string({ validate: Validators.required })
  description: String;

  @Fields.string({
    validate: Validators.required,
  })
  date: String;

  @Fields.string({
    validate: Validators.required,
  })
  slotId: string;
}
