import { Route, Routes } from "react-router";
import { HomePage } from "./home";
import { AddTaskPage } from "./add";
import { TaskPage } from "./task";
import { Layout } from "./layout";

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/add" element={<AddTaskPage />} />
        <Route path="/todo/:slug" element={<TaskPage />} />
      </Route>
    </Routes>
  );
};
