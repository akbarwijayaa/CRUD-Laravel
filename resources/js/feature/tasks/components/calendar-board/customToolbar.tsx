import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

export default function CustomToolbar({
  date,
  onNavigate,
}: CustomToolbarProps) {
  // Handle invalid date
  const formatDate = (date: Date) => {
    try {
      if (!date || isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return format(date, "MMMM yyyy");
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="flex gap-x-4 items-center w-full lg:w-auto justify-center lg:justify-start">
      <Button
        size={"icon"}
        variant={"secondary"}
        className="flex items-center"
        onClick={() => onNavigate("PREV")}
      >
        <ChevronLeftIcon className="size-5" />
      </Button>
      <div className="flex items-center">
        <CalendarIcon className="w-4 h-4 mr-2" />
        {formatDate(date)}
      </div>
      <Button
        size={"icon"}
        variant={"secondary"}
        className="flex items-center"
        onClick={() => onNavigate("NEXT")}
      >
        <ChevronRightIcon className="size-5" />
      </Button>
    </div>
  );
}
