"use client";

import DottedSeparatoo from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useConfirm from "@/hooks/use-confirm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Loader } from "lucide-react";
import { useRef } from "react";
import { Project } from "../type";
import { useUpdateProject } from "../api/use-update-project";
import {
  UpdateProjectSchema,
  UpdateProjectSchemaType,
} from "@/validations/projects/project-schema";
import { useDeleteProject } from "../api/use-delete-project";
import { ImagePreview } from "@/components/image/image-prev";
import { toast } from "sonner";

interface EditWorkspaceFormProps {
  onCancel?: () => void;
  initialValue: Project;
}

export default function EditProjectForm({
  onCancel,
  initialValue,
}: EditWorkspaceFormProps) {
  const { mutate, isPending } = useUpdateProject();
  const { mutate: deleteProject, isPending: DeleteProjectLoading } =
    useDeleteProject();

  const [DeleteDialog, confirmDialog] = useConfirm(
    "Delete Project",
    "This action will permanently delete this project and all its associated data. This cannot be undone.",
    "destructive"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UpdateProjectSchemaType>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      ...initialValue,
      imageUrl: initialValue.imageUrl,
    },
  });

  const handleDeleteWorkspace = async () => {
    const ok = await confirmDialog();
    if (!ok) return;

    deleteProject({
      param: {
        projectId: initialValue.id.toString(),
      },
    });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error("Image size must be less then 1MB.");
      return;
    }

    form.setValue("imageUrl", file);
  };

  const handleBackNavigation = () => {
    if (onCancel) {
      onCancel();
    } else {
      window.location.href = `/workspaces/${initialValue.workspaceId}/projects/${initialValue.id.toString()}`;
    }
  };

  const onSubmit = (data: UpdateProjectSchemaType) => {
    const finalData = {
      ...data,
      imageUrl: data.imageUrl instanceof File ? data.imageUrl : "",
    };

    mutate({
      form: finalData,
      param: { projectId: initialValue.id.toString() },
    });
  };

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <DeleteDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-grow gap-x-4 p-7 max-sm:!px-0 space-y-0">
          <div className="flex items-center justify-start gap-x-4">
            <Button
              type="button"
              variant={"secondary"}
              onClick={handleBackNavigation}
              disabled={isPending}
            >
              <ArrowLeft />
              Back
            </Button>
            <CardTitle>{initialValue.name}</CardTitle>
          </div>
        </CardHeader>

        <div className="px-7 max-sm:!px-0">
          <DottedSeparatoo />
        </div>

        <CardContent className="py-7 max-sm:!px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Name</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your project"
                        disabled={isPending}
                        {...field}
                        className="text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="imageUrl"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <div className="flex gap-4">
                      <ImagePreview value={field.value ?? null} />

                      <div className="flex flex-col">
                        <p className="text-sm">Project Icon</p>
                        <p className="text-xs text-muted-foreground">
                          Upload a project icon. (PNG, JPG, svg, JPEG), max 1mb
                        </p>

                        <Input
                          type="file"
                          accept=".jpg, .jpeg, .png, .svg"
                          className="hidden"
                          ref={inputRef}
                          onChange={handleChangeImage}
                          disabled={isPending}
                        />

                        {field.value ? (
                          <Button
                            type="button"
                            variant={"destructive"}
                            className="mt-2 w-full text-sm"
                            onClick={() => {
                              field.onChange(null);
                              if (inputRef.current) {
                                inputRef.current.value = "";
                              }
                            }}
                            disabled={isPending}
                          >
                            Remove Image
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant={"outline"}
                            className="mt-2 w-full text-sm"
                            onClick={() => inputRef.current?.click()}
                            disabled={isPending}
                          >
                            Update Image
                          </Button>
                        )}
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end gap-3 my-4">
                <Button disabled={isPending}>
                  {isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Update Project"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="py-7 max-sm:!px-0">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Once you delete a project, there is no going back. This action
              cannot be undone.
            </p>
            <Button
              type="button"
              variant={"destructive"}
              className="mt-2 w-fit ml-auto"
              disabled={isPending || DeleteProjectLoading}
              onClick={handleDeleteWorkspace}
            >
              Delete Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
