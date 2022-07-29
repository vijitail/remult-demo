import { BackendMethod, Remult } from "remult";
import { Booking } from "../entities/Booking.entity";
import { Slot } from "../entities/Slot.entity";
import { addWeekDays, formattedDate } from "../utils/date";

export class BookingsController {
  @BackendMethod({ allowed: true })
  static async getAvailableDates() {
    const addDates = (date: Date, count = 0) =>
      formattedDate(addWeekDays(date, count));

    return Array.from({ length: 5 }).map((v, idx) => addDates(new Date(), idx));
  }

  @BackendMethod({ allowed: true })
  static async getAvailableSlots(date: string, remult?: Remult) {
    if (!remult) return [];
    const unavailableSlotIds = (
      await remult.repo(Booking).find({ where: { date } })
    ).map((booking) => booking.slotId);

    const availableSlots = await remult
      .repo(Slot)
      .find({ where: { id: { $ne: unavailableSlotIds } } });

    return availableSlots;
  }

  @BackendMethod({ allowed: false })
  static async createMeeting(remult?: Remult) {
    console.log("Hello", process.env.API_PORT);
  }
}
