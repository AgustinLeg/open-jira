interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "pendientes: Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsum, maxime nostrum",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      description:
        "progreso: Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsum, maxime nostrum",
      createdAt: Date.now() - 1000000,
      status: "in-progress",
    },
    {
      description:
        "finished: Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsum, maxime nostrum",
      createdAt: Date.now() - 100000,
      status: "finished",
    },
  ],
};
