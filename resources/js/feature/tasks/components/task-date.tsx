import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";

interface TaskDateProps {
  value: string | null | undefined;
  className?: string;
}

export default function TaskDate({ value, className }: TaskDateProps) {
  // Handle null, undefined, or invalid date values
  if (!value) {
    return (
      <div className="text-muted-foreground">
        <span className={cn("truncate", className)}>No due date</span>
      </div>
    );
  }

  const today = new Date();
  const endDate = new Date(value);
  
  // Check if the date is valid
  if (isNaN(endDate.getTime())) {
    return (
      <div className="text-muted-foreground">
        <span className={cn("truncate", className)}>Invalid date</span>
      </div>
    );
  }

  const diffInDays = differenceInDays(endDate, today);

  let textColor = "text-muted-foreground";

  if (diffInDays <= 3) {
    textColor = "text-red-500";
  } else if (diffInDays <= 7) {
    textColor = "text-orange-500";
  } else if (diffInDays <= 14) {
    textColor = "text-yellow-500";
  }

  return (
    <div className={textColor}>
      <span className={cn("truncate", className)}>{format(endDate, "PPP")}</span>
    </div>
  );
}
