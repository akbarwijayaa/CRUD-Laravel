import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEventHandler } from 'react';
import { useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import InputError from '@/components/input-error';

export function RegisterForm({
  className,  
  ...props
}: React.ComponentProps<"form">) {

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
      e.preventDefault();
      post(route("register"), {
          onFinish: () => reset("password", "password_confirmation"),
      });
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={submit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create a new account
        </p>
      </div>

      

      <div className="grid gap-6">
        <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
                id="name"
                type="text"
                required
                autoFocus
                tabIndex={1}
                autoComplete="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
                placeholder="Full name"
            />
            <InputError message={errors.name} className="mt-2" />
        </div>
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
          </div>
          <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Password"
              required
          />
          <InputError message={errors.password} />
        </div>
        <div className="grid gap-3">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
                id="password_confirmation"
                type="password"
                required
                autoComplete="current-password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                disabled={processing}
                placeholder="Confirm password"
            />
            <InputError message={errors.password_confirmation} />
        </div>
         <Button type="submit" className="w-full" tabIndex={4} disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Sign Up
          </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  )
}
