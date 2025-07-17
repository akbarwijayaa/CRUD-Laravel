"use client";
import { useState } from "react";
import {
  format,
  getDay,
  parse,
  // startOfMonth,
  addMonths,
  subMonths,
  startOfWeek,
} from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { enUS } from "date-fns/locale";
import { Task, TasksStatus } from "../../type";
import { Project } from "@/feature/projects/type";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./data-calendar.css";
import EventCard from "./EventCard";
import CustomToolbar from "./customToolbar";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface DataCalendarProps {
  data: Task[];
}

export function DataCalendar({ data }: DataCalendarProps) {
  // Find the first valid date or use current date
  const getInitialDate = () => {
    const taskWithDate = data.find(task => task.due_date && !isNaN(new Date(task.due_date).getTime()));
    return taskWithDate && taskWithDate.due_date ? new Date(taskWithDate.due_date) : new Date();
  };

  const [value, setValue] = useState(getInitialDate());

  // Filter out tasks without valid due dates and create events
  const events = data
    .filter(task => task.due_date && !isNaN(new Date(task.due_date).getTime()))
    .map((task) => {
      const dueDate = task.due_date ? new Date(task.due_date) : new Date();
      return {
        end: dueDate,
        start: dueDate,
        title: task.name,
        project: task.project,
        assignee: task.assignee,
        status: task.status,
        id: task.id?.toString() || task.$id || '',
      };
    });

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue((prev) => subMonths(prev, 1));
    } else if (action === "NEXT") {
      setValue((prev) => addMonths(prev, 1));
    } else if (action === "TODAY") {
      setValue(new Date());
    }
  };

  return (
    <div className="mt-3">
      <div className="sticky top-0 z-20 bg-neutral-900 px-4 py-2 rounded-lg mb-2">
        <CustomToolbar date={value} onNavigate={handleNavigate} />
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        date={value}
        defaultView="month"
        views={["month"]}
        showAllEvents
        toolbar={false}
        className="h-full overflow-x-auto"
        max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        formats={{
          weekdayFormat: (date, culture, localizer) =>
            localizer?.format(date, "EEE", culture) ?? "",
        }}
        components={{
          eventWrapper: ({ event }) => (
            <EventCard
              id={event.id}
              title={event.title}
              project={event.project as unknown as Project}
              assignee={(event.assignee as { name: string })?.name || "Unassigned"}
              status={event.status as TasksStatus}
            />
          ),
          // toolbar: () => (
          //   <CustomToolbar date={value} onNavigate={handleNavigate} />
          // ),
        }}
      />
    </div>
  );
}
