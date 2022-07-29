/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { remult } from "../common";
import { BookingsController } from "../shared/controllers/Booking.controller";
import { Booking } from "../shared/entities/Booking.entity";
import { Slot } from "../shared/entities/Slot.entity";

const bookingRepo = remult.repo(Booking);

export const BookingForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const bookingDate = watch("date");

  useEffect(() => {
    BookingsController.getAvailableDates().then(setAvailableDates);
  }, []);

  useEffect(() => {
    if (!availableDates.length) return;
    setValue("date", availableDates[0]);
    BookingsController.getAvailableSlots(availableDates[0]).then(
      setAvailableSlots
    );
  }, [availableDates]);

  useEffect(() => {
    BookingsController.getAvailableSlots(bookingDate).then(setAvailableSlots);
  }, [bookingDate]);

  useEffect(() => {
    setValue("slotId", availableSlots[0]?.id);
  }, [availableSlots]);

  const onSubmit = async (values: Record<string, any>) => {
    try {
      setSubmitting(true);
      const data = await bookingRepo.save(values);
      console.log({ data });
      reset();
    } catch (error: any) {
      setError("formError", {
        message: error?.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container grid-md">
      <div className="pt-2 mt-2">
        {errors.formError && (
          <div className="toast toast-error">
            <button
              className="btn btn-clear float-right"
              onClick={() => clearErrors("formError")}
            ></button>
            <>{errors.formError.message}</>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-input"
              type="text"
              id="name"
              {...register("name")}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-input"
              type="text"
              id="email"
              {...register("email")}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-input"
              id="description"
              rows={3}
              {...register("description")}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="date">
              Date
            </label>
            <select className="form-select" id="date" {...register("date")}>
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="availableSlots">
              Available Slots
            </label>
            <select
              className="form-select"
              id="availableSlots"
              {...register("slotId")}
            >
              {availableSlots.map((slot) => (
                <option value={slot.id} key={slot.id}>
                  {slot.startTime} - {slot.endTime}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button
              disabled={isSubmitting}
              className={`btn btn-primary d-block ${
                isSubmitting ? "loading" : ""
              }`}
            >
              Book Now{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
