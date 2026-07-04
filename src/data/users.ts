import { User } from "@/types";

export const sampleUsers: User[] = [
  {
    id: "user1",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "+1 (212) 555-0100",
    avatar:
      "/images/testimonials/51.jpg",
    addresses: [
      {
        id: "addr1",
        label: "Home",
        firstName: "Jane",
        lastName: "Doe",
        street: "123 Rose Garden Ave",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        phone: "+1 (212) 555-0100",
        isDefault: true,
      },
    ],
    createdAt: "2023-06-15T10:00:00Z",
    preferences: {
      newsletter: true,
      smsNotifications: false,
      orderUpdates: true,
    },
  },
  {
    id: "user2",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@example.com",
    phone: "+1 (415) 555-0200",
    avatar:
      "/images/testimonials/46.jpg",
    addresses: [],
    createdAt: "2023-09-20T10:00:00Z",
    preferences: {
      newsletter: false,
      smsNotifications: true,
      orderUpdates: true,
    },
  },
];