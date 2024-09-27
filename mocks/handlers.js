import { http, HttpResponse } from "msw";
import { addDays, subDays, format } from "date-fns";

const setDate = (date) => format(date, "yyyy-MM-dd");

const mockDb = {
  users: [
    { userId: "1", surname: "Smith" },
    { userId: "2", surname: "Johnson" },
    { userId: "3", surname: "Williams" },
    { userId: "4", surname: "Brown" },
    { userId: "5", surname: "Jones" },
  ],
  bookings: [
    {
      id: "1",
      bookingReference: "ABC123",
      userId: "1",
      title: "Dover to Calais",
      details: "Standard vehicle ferry crossing",
      date: setDate(addDays(new Date(), 15)),
      time: "08:00",
      passengers: 2,
      vehicle: "Car",
      ticketUuid: "8f7e6d5c-4b3a-2a1e-9f8d-7c6b5a4e3d2c",
    },
    {
      id: "2",
      bookingReference: "DEF456",
      userId: "1",
      title: "Calais to Dover",
      details: "Return journey - Standard vehicle ferry crossing",
      date: setDate(addDays(new Date(), 18)),
      time: "18:00",
      passengers: 2,
      vehicle: "Car",
      ticketUuid: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    },
    {
      id: "3",
      bookingReference: "GHI789",
      userId: "2",
      title: "Portsmouth to Santander",
      details: "Long distance ferry with cabin",
      date: "2024-11-05",
      time: "20:00",
      passengers: 4,
      vehicle: "Motorhome",
      ticketUuid: "f1e2d3c4-b5a6-9876-5432-1fedcba98765",
    },
    {
      id: "4",
      bookingReference: "JKL012",
      userId: "3",
      title: "Holyhead to Dublin",
      details: "Express ferry service",
      date: "2024-09-30",
      time: "14:30",
      passengers: 1,
      vehicle: "Motorcycle",
      ticketUuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    },
    {
      id: "5",
      bookingReference: "MNO345",
      userId: "4",
      title: "Newcastle to Amsterdam",
      details: "Overnight ferry with cabin",
      date: "2024-12-18",
      time: "17:00",
      passengers: 3,
      vehicle: "Van",
      ticketUuid: "9876fedc-ba98-7654-3210-abcdef123456",
    },
    {
      id: "6",
      bookingReference: "PQR678",
      userId: "1",
      title: "Dover to Calais",
      details: "Standard vehicle ferry crossing",
      date: setDate(subDays(new Date(), 50)),
      time: "08:00",
      passengers: 2,
      vehicle: "Car",
      ticketUuid: "8ae2d3c4-b5a6-7890-abcd-1fedcbae5796",
    },
  ],
};

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

export default mockDb;

export const handlers = [
  http.post("http://localhost:3001/login", async ({ request }) => {
    const { bookingReference, surname } = await request.json();

    const foundBookingRef = mockDb.bookings.find(
      (u) => u.bookingReference === bookingReference
    );

    const foundSurname = mockDb.users.find(
      (u) => u.userId === foundBookingRef.userId
    )?.surname;

    await wait(300);

    if (!foundBookingRef || foundSurname !== surname) {
      return HttpResponse.json({ success: false, message: "Login failed" });
    }

    return HttpResponse.json({
      success: true,
      message: "Login successful",
      userId: foundBookingRef.userId,
    });
  }),

  http.get(
    "http://localhost:3001/users/:userId/bookings/future",
    async ({ params }) => {
      const { userId } = params;
      const today = format(new Date(), "yyyy-MM-dd");

      const userBookings = mockDb.bookings.filter(
        (b) => b.userId === userId && b.date >= today
      );
      await wait(600);

      return HttpResponse.json(userBookings);
    }
  ),

  http.get(
    "http://localhost:3001/users/:userId/bookings/historic",
    async ({ params }) => {
      const { userId } = params;

      const today = format(new Date(), "yyyy-MM-dd");

      const userBookings = mockDb.bookings.filter(
        (b) => b.userId === userId && b.date < today
      );
      await wait(800);

      return HttpResponse.json(userBookings);
    }
  ),

  http.get("http://localhost:3001/users/:userId/bookings/:id", ({ params }) => {
    const { id } = params;
    const booking = mockDb.bookings.find((b) => b.id === id);
    return HttpResponse.json(booking);
  }),
];
