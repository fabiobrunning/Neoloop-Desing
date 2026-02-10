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
import { Checkbox } from "../../atoms/checkbox";
import { FormField } from "../../molecules/form-field";

/* ── SignupForm ─────────────────────────────────────────────────────────── */

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
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
  /** Called with form data on submit */
  onSubmit?: (data: SignupFormData) => void;
  /** Show terms & conditions checkbox */
  showTerms?: boolean;
  /** Terms label (JSX allowed) */
  termsLabel?: React.ReactNode;
  /** Footer content (e.g., "Already have an account? Sign in") */
  footer?: React.ReactNode;
}

const SignupForm = React.forwardRef<HTMLDivElement, SignupFormProps>(
  (
    {
      className,
      title = "Create account",
      description = "Enter your details to get started",
      submitLabel = "Sign up",
      loading = false,
      error,
      onSubmit,
      showTerms = true,
      termsLabel = "I agree to the Terms of Service and Privacy Policy",
      footer,
      ...props
    },
    ref,
  ) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [termsAccepted, setTermsAccepted] = React.useState(false);
    const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});

    const validate = (): boolean => {
      const errors: Record<string, string> = {};
      if (!name.trim()) errors.name = "Name is required";
      if (!email.trim()) errors.email = "Email is required";
      if (!password) errors.password = "Password is required";
      else if (password.length < 8) errors.password = "Password must be at least 8 characters";
      if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
      if (showTerms && !termsAccepted) errors.terms = "You must accept the terms";
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        onSubmit?.({ name, email, password, confirmPassword });
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
              id="signup-name"
              label="Full name"
              required
              error={fieldErrors.name}
              inputProps={{
                type: "text",
                placeholder: "John Doe",
                autoComplete: "name",
                value: name,
                onChange: (e) => setName(e.target.value),
              }}
            />
            <FormField
              id="signup-email"
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
              id="signup-password"
              label="Password"
              required
              error={fieldErrors.password}
              helperText={!fieldErrors.password ? "At least 8 characters" : undefined}
              inputProps={{
                type: "password",
                placeholder: "Create a password",
                autoComplete: "new-password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
              }}
            />
            <FormField
              id="signup-confirm-password"
              label="Confirm password"
              required
              error={fieldErrors.confirmPassword}
              inputProps={{
                type: "password",
                placeholder: "Repeat your password",
                autoComplete: "new-password",
                value: confirmPassword,
                onChange: (e) => setConfirmPassword(e.target.value),
              }}
            />
            {showTerms && (
              <div className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="signup-terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    aria-invalid={!!fieldErrors.terms}
                  />
                  <label
                    htmlFor="signup-terms"
                    className={cn(
                      "text-xs leading-relaxed cursor-pointer",
                      fieldErrors.terms ? "text-error" : "text-text-secondary",
                    )}
                  >
                    {termsLabel}
                  </label>
                </div>
                {fieldErrors.terms && (
                  <p className="text-xs text-error" role="alert">
                    {fieldErrors.terms}
                  </p>
                )}
              </div>
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

SignupForm.displayName = "SignupForm";

export { SignupForm };
