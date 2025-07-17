import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import AnalyticsCard from "./analytics-card";

interface AnalyticsProps {
  taskCount?: number;
  taskDifference?: number;
  assigneeTaskCount?: number;
  assigneeTaskDifference?: number;
  completedTask?: number;
  completedTaskDifference?: number;
  inCompletedTask?: number;
  inCompletedTaskDifference?: number;
  overDueTask?: number;
  overDueTaskDifference?: number;
}

export default function Analytics({ data }: { data: AnalyticsProps }) {
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Total tasks"
            value={data?.taskCount ?? 0}
            variant={data?.taskDifference || 0 > 0 ? "up" : "down"}
            increaseValue={data?.taskDifference || 0}
          />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Assignee tasks"
            value={data?.assigneeTaskCount ?? 0}
            variant={data?.assigneeTaskDifference || 0 > 0 ? "up" : "down"}
            increaseValue={data?.assigneeTaskCount ?? 0}
          />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Completed tasks"
            value={data?.completedTask ?? 0}
            variant={data?.completedTaskDifference || 0 > 0 ? "up" : "down"}
            increaseValue={data?.completedTask ?? 0}
          />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Incomplete tasks"
            value={data?.inCompletedTask ?? 0}
            variant={data?.inCompletedTaskDifference || 0 > 0 ? "up" : "down"}
            increaseValue={data?.inCompletedTask ?? 0}
          />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Over Due tasks"
            value={data?.overDueTask ?? 0}
            variant={data?.overDueTaskDifference || 0 > 0 ? "up" : "down"}
            increaseValue={data?.overDueTask ?? 0}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
