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
import {
  UpdateWorkspacesSchema,
  inferUpdateWorkspacesSchema,
} from "@/validations/workspaces/workspaces_schema";
import useConfirm from "@/hooks/use-confirm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, CopyIcon, Loader } from "lucide-react";
import { useRef } from "react";
import { Workspace } from "../type";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { router } from "@inertiajs/react";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { toast } from "sonner";
import { useUpdateInviteCodeWorkspace } from "../api/use-update-invaite-code-workspace";
import { ImagePreview } from "@/components/image/image-prev";

interface EditWorkspaceFormProps {
  onCancel?: () => void;
  initialValue: Workspace;
}

export default function EditWorkspaceForm({
  onCancel,
  initialValue,
}: EditWorkspaceFormProps) {
  const { mutate, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: DeleteWorkspaceLoading } =
    useDeleteWorkspace();
  
  const { mutate: resetInviteCode, isPending: ResetInviteCodeLoading } =
    useUpdateInviteCodeWorkspace();
  const [DeleteDialog, confirmDialog] = useConfirm(
    "Delete Workspace",
    "This action cannot be undone.",
    "destructive"
  );
  const [ResetDialog, confirmReset] = useConfirm(
    "Reset invite code",
    "This will invalidate the current invite link.",
    "destructive"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<inferUpdateWorkspacesSchema>({
    resolver: zodResolver(UpdateWorkspacesSchema),
    defaultValues: {
      ...initialValue,
      imageUrl: initialValue.image_url_full || initialValue.imageUrl,
    },
  });

  const handleDeleteWorkspace = async () => {
    try {
      const ok = await confirmDialog();
      if (!ok) return;

      deleteWorkspace({
        param: {
          workspaceId: initialValue.id.toString(),
        },
      });
    } catch (error) {
      console.error('Error in delete workspace handler:', error);
      toast.error('An error occurred while trying to delete the workspace');
    }
  };

  const handleResetInviteCode = async () => {
    const ok = await confirmReset();
    if (!ok) return;

    resetInviteCode({
      param: {
        workspaceId: initialValue.id.toString(),
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
      router.visit(`/workspaces/${initialValue.id.toString()}`);
    }
  };

  const onSubmit = (data: inferUpdateWorkspacesSchema) => {
    const finalData = {
      ...data,
      imageUrl: data.imageUrl instanceof File ? data.imageUrl : "",
    };

    mutate(
      { form: finalData, param: { workspaceId: initialValue.id.toString() } },
      {
        onSuccess: (data) => {
          form.reset();
          // Force a hard refresh to update the workspace data in the sidebar
          router.visit(`/workspaces/${data?.data?.id.toString()}`, {
            method: 'get',
            preserveScroll: false,
            preserveState: false,
          });
        },
      }
    );
  };

  const fullInviteCode = `${window.location.origin}/workspaces/${initialValue.id.toString()}/join/${initialValue.inviteCode}`;

  const handleInviteLink = () => {
    navigator.clipboard
      .writeText(fullInviteCode)
      .then(() => toast.success("Invite link copied to clipboard"));
  };

  return (
    <div className="flex flex-col gap-y-4 w-full mx-auto">
      <DeleteDialog />
      <ResetDialog />
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
                        placeholder="Enter your workspace"
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
                        <p className="text-sm">Workspace Icon</p>
                        <p className="text-xs text-muted-foreground">
                          Upload a workspace icon. (PNG, JPG, svg, JPEG), max
                          2mb
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
                    "Update Workspace"
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
            <h3 className="font-bold">Invite Code</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace.
            </p>

            <div className="mt-4">
              <div className="flex items-center gap-1">
                <Input disabled value={fullInviteCode} />
                <Button onClick={handleInviteLink} variant={"secondary"}>
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>

            <Button
              type="button"
              variant={"destructive"}
              className="mt-2 w-fit ml-auto"
              disabled={isPending || ResetInviteCodeLoading}
              onClick={handleResetInviteCode}
            >
              Reset Invite Code
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="py-7 max-sm:!px-0">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible and will remove all associated data.
            </p>
            <Button
              type="button"
              variant={"destructive"}
              className="mt-2 w-fit ml-auto cursor-pointer"
              disabled={DeleteWorkspaceLoading || isPending}
              onClick={handleDeleteWorkspace}
              aria-label="Delete workspace - this action cannot be undone"
              title="Delete workspace - this action cannot be undone"
            >
              {DeleteWorkspaceLoading ? (
                <>
                  <Loader className="animate-spin size-4 mr-2" />
                  Deleting...
                </>
              ) : (
                'Delete Workspace'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
