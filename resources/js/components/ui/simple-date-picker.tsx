"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SimpleDatePickerProps {
  value?: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
}

export function SimpleDatePicker({
  value,
  onChange,
  className,
  placeholder = "Select Date",
}: SimpleDatePickerProps) {
  const [showInput, setShowInput] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const displayDate = (date: Date | undefined) => {
    if (!date) return placeholder;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    if (dateValue) {
      onChange(new Date(dateValue));
    } else {
      onChange(undefined);
    }
  };

  const handleButtonClick = () => {
    setShowInput(true);
    // Focus the input after a short delay to ensure it's rendered
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleInputBlur = () => {
    setShowInput(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setShowInput(false);
    }
  };

  if (showInput) {
    return (
      <Input
        ref={inputRef}
        type="date"
        value={formatDate(value)}
        onChange={handleDateChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className={cn("w-full", className)}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "w-full justify-start text-left font-normal px-3",
        !value && "text-muted-foreground",
        className
      )}
      onClick={handleButtonClick}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {displayDate(value)}
    </Button>
  );
}
