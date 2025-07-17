"use client";

import DottedSeparatoo from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, Loader } from "lucide-react";
import { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { type FormDataConvertible } from '@inertiajs/core';
import { useModalContext } from "@/contexts/modal-context";

type FormData = {
  name: string;
  image: File | null;
} & Record<string, FormDataConvertible>;

export default function CreateWorkSpacesForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Make modal context optional to support both modal and page usage
  let closeWorkspaceModal: (() => void) | undefined;
  try {
    const modalContext = useModalContext();
    closeWorkspaceModal = modalContext.closeWorkspaceModal;
  } catch (error) {
    // Modal context not available, which is fine for the standalone create page
    closeWorkspaceModal = undefined;
  }

  const { data, setData, post, processing, errors, reset } = useForm<FormData>({
    name: "",
    image: null,
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData("image", file);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("workspaces.store"), {
      forceFormData: true,
      onSuccess: () => {
        toast.success("Workspace created 👍🏻");
        reset();
        // Close modal if it's open
        closeWorkspaceModal?.();
      },
      onError: () => {
        toast.error("Failed to create workspace. Please check the errors.");
      },
    });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle>Create a new workspace</CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparatoo />
      </div>

      <CardContent className="py-7">
        <form onSubmit={onSubmit}>
          {/* Input untuk Name */}
          <FormItem>
            <Label htmlFor="name">Name</Label>
            {/* ❌ Hapus <FormControl> */}
            <Input
              id="name"
              type="text"
              placeholder="Enter your workspace"
              disabled={processing}
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="text-sm"
            />
            {/* ✅ Ganti <FormMessage> dengan tag <p> sederhana untuk error */}
            {errors.name && (
              <p className="text-sm font-medium text-destructive">{errors.name}</p>
            )}
          </FormItem>

          {/* Input untuk Image */}
          <FormItem className="mt-6">
            <Label>Workspace Icon</Label>
            <div className="flex gap-4 mt-2">
              {data.image ? (
                <img
                  src={URL.createObjectURL(data.image)}
                  alt="Workspace Image"
                  className="object-cover size-[73px] rounded-md"
                />
              ) : (
                <Avatar className="size-[73px]">
                  <AvatarFallback>
                    <ImageIcon className="size-[36px] text-neutral-500" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col w-full">
                <p className="text-xs text-muted-foreground">
                  Upload an icon (PNG, JPG, SVG), max 2mb
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={inputRef}
                  onChange={handleChangeImage}
                  disabled={processing}
                />
                {data.image ? (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setData("image", null)}
                  >
                    Remove Image
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => inputRef.current?.click()}
                  >
                    Upload Image
                  </Button>
                )}
              </div>
            </div>
            {/* ✅ Ganti <FormMessage> dengan tag <p> sederhana untuk error */}
            {errors.image && (
              <p className="text-sm font-medium text-destructive mt-2">{errors.image}</p>
            )}
          </FormItem>

          <div className="flex items-center justify-end gap-3 my-4">
            <Button disabled={processing}>
              {processing ? <Loader className="animate-spin" /> : "Create Workspace"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}