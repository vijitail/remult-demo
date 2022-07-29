import { remultExpress } from "remult/remult-express";
import { MongoClient } from "mongodb";
import { MongoDataProvider } from "remult/remult-mongo";
import { Slot } from "../shared/entities/Slot.entity";
import { BookingsController } from "../shared/controllers/Booking.controller";
import { Booking } from "../shared/entities/Booking.entity";

export const api = remultExpress({
  entities: [Slot, Booking],
  controllers: [BookingsController],
  initApi: async (remult) => {
    const slotRepo = remult.repo(Slot);
    const shouldAddAvailablSlots = (await slotRepo.count()) === 0;

    if (shouldAddAvailablSlots) {
      const availableSlots = [10, 11, 12, 13, 14, 15, 16, 17].map((time) => ({
        startTime: `${time}:00`,
        endTime: `${time}:45`,
      }));

      await slotRepo.insert(availableSlots);
    }
  },
  dataProvider: async () => {
    const client = new MongoClient(process.env.MONGO_URL || "");
    await client.connect();
    console.log("Database connected");
    return new MongoDataProvider(client.db("remult-booking"), client);
  },
});
