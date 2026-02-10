import * as React from "react";
import { cn } from "../../lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../atoms/card";
import { Button } from "../../atoms/button";
import { FormField } from "../../molecules/form-field";

/* ── LoginForm ─────────────────────────────────────────────────────────── */

export interface LoginFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  /** Card title */
  title?: string;
  /** Card description */
  description?: string;
  /** Submit button label */
  submitLabel?: string;
  /** Loading state */
  loading?: boolean;
  /** Error message shown at the top */
  error?: string;
  /** Called with email and password on submit */
  onSubmit?: (data: { email: string; password: string }) => void;
  /** Show "forgot password" link */
  showForgotPassword?: boolean;
  /** Called when forgot password is clicked */
  onForgotPassword?: () => void;
  /** Footer content (e.g., "Don't have an account? Sign up") */
  footer?: React.ReactNode;
}

const LoginForm = React.forwardRef<HTMLDivElement, LoginFormProps>(
  (
    {
      className,
      title = "Welcome back",
      description = "Enter your credentials to access your account",
      submitLabel = "Sign in",
      loading = false,
      error,
      onSubmit,
      showForgotPassword = true,
      onForgotPassword,
      footer,
      ...props
    },
    ref,
  ) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});

    const validate = (): boolean => {
      const errors: Record<string, string> = {};
      if (!email.trim()) errors.email = "Email is required";
      if (!password) errors.password = "Password is required";
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        onSubmit?.({ email, password });
      }
    };

    return (
      <Card
        ref={ref}
        className={cn("w-full max-w-sm", className)}
        {...props}
      >
        <form onSubmit={handleSubmit} noValidate>
          <CardHeader className="text-center">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {error && (
              <div
                className="rounded-md bg-error/10 border border-error/20 px-3 py-2 text-sm text-error"
                role="alert"
              >
                {error}
              </div>
            )}
            <FormField
              id="login-email"
              label="Email"
              required
              error={fieldErrors.email}
              inputProps={{
                type: "email",
                placeholder: "you@example.com",
                autoComplete: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }}
            />
            <FormField
              id="login-password"
              label="Password"
              required
              error={fieldErrors.password}
              inputProps={{
                type: "password",
                placeholder: "Enter your password",
                autoComplete: "current-password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
              }}
            />
            {showForgotPassword && (
              <Button
                type="button"
                variant="link"
                size="sm"
                className="self-end -mt-1 h-auto p-0 text-xs"
                onClick={onForgotPassword}
              >
                Forgot password?
              </Button>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              {submitLabel}
            </Button>
            {footer}
          </CardFooter>
        </form>
      </Card>
    );
  },
);

LoginForm.displayName = "LoginForm";

export { LoginForm };
