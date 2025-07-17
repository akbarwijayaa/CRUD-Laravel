import { cn } from "@/lib/utils"
import InputError from '@/components/input-error';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEventHandler } from 'react';
import { useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

export function LoginForm({
  className,  
  ...props
}: React.ComponentProps<"form">) {

  const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

  const submit: FormEventHandler = (e) => {
      e.preventDefault();
      post(route("login"), {
          onFinish: () => reset("password"),
      });
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={submit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              autoFocus
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              required
          />
          <InputError message={errors.email} />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              required
          />
          <InputError message={errors.password} />
        </div>
         <Button type="submit" className="w-full" tabIndex={4} disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Log in
          </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
