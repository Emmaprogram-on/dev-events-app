"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authformSchema } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/dist/client/components/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { getLoggedInUser, signIn, signUp } from "@/lib/action/user.actions";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().optional(),
});

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const loggedInUser = await getLoggedInUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log("Form errors", form.formState.errors);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted", data);
    setIsLoading(true);

    try {
              if (type === 'sign-up') {
        const newUser = await signUp(data);
        if (newUser) {
          setUser(newUser);
          router.push('/sign-in');
        }
        
      }
      

      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        })

        if (response) router.push('/onboarding');
      }
    }  catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
     }
  };
   return (
    <section className="auth-form-wrapper">
      <div className="auth-form-inner">

        <div className="auth-form-header">
          <h3>
            {user
              ? "Link Account"
              : type === "sign-in"
                ? "Sign In to Continue"
                : "Sign Up for an Account"}
          </h3>
          <p className="text-sm text-light-200">
            {user
              ? "Please link your account to proceed."
              : type === "sign-in"
                ? "Welcome back! Please enter your details to sign in."
                : "Create your account by filling in the details below."}
          </p>
        </div>

        <FieldSet className="auth-form-fieldset">
          <FieldGroup>
            <form
              id="form-rhf-demo"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {type === "sign-up" && (
                <>
                  <div className="auth-name-row">
                    <Field>
                      <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                      <Input
                        id="firstName"
                        type="text"
                         placeholder="Enter your first name"
                         {...form.register("firstName")}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                      <Input
                        id="lastName"
                        type="text"
                         placeholder="Enter your last name"
                          {...form.register("lastName")}
                      />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                       placeholder="Enter your email address"
                        {...form.register("email")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                       placeholder="Enter your password"
                        {...form.register("password")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                       placeholder="Confirm your password"
                        {...form.register("confirmPassword")}
                    />
                  </Field>

                  <Button
                    className="button-submit"
                    form="form-rhf-demo"
                    disabled={isLoading}
                    type="submit"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Loading...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </>
              )}

              {type === "sign-in" && (
                <>
                  <Field>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                       placeholder="Enter your email address"
                        {...form.register("email")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                       placeholder="Enter your password"
                        {...form.register("password")}
                    />
                  </Field>

                  <Button
                    className="button-submit"
                    form="form-rhf-demo"
                    disabled={isLoading}
                    type="submit"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Loading...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </>
              )}
            </form>
          </FieldGroup>
        </FieldSet>

        <footer className="auth-form-footer">
          <p className="text-sm text-light-200">
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            className="form-link"
          >
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </footer>

      </div>
    </section>
  );
};

export default AuthForm;
