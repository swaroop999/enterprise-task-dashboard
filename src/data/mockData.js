export const defaultTasks = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create wireframes and mockups for the new landing page",
    status: "pending",
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Implement authentication",
    description: "Add OAuth support for Google and GitHub",
    status: "in-progress",
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Write API documentation",
    description: "Document all REST endpoints with examples",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Setup CI/CD pipeline",
    description: "Configure automated testing and deployment",
    status: "done",
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
];
