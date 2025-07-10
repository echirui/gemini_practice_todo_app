import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/tasks/index.tsx"),
  route("tasks/:id", "routes/tasks/$id.tsx"),
] satisfies RouteConfig;
