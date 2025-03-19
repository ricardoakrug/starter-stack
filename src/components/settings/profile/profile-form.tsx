"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { profileFormSchema } from "@/lib/schemas/profile";
import { ProfileFormValues } from "@/lib/types/profile";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserData, updateUserProfile } from "@/lib/actions/user/user";
import { useEffect } from "react";
import { toast } from "sonner";
import { countries } from "@/lib/consts/countries";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/ui/loading";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileForm() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    retry: 1,
  });

  const updateMutation = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      return updateUserProfile(values);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userData"] });

      toast.success("Profile updated successfully", {
        description: "Your changes have been saved.",
      });
    },
    onError: (error) => {
      toast.error("Failed to update profile", {
        description:
          "Please try again or contact support if the problem persists.",
      });
      console.error("[PROFILE_UPDATE]", error);
    },
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      about: "",
      image: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      taxId: "",
      socialMedia: {},
    },
  });

  // Update form values when data is loaded
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        name: data.user?.[0]?.name || "",
        email: data.user?.[0]?.email || "",
        username: data.user?.[0]?.username || "",
        about: data.user?.[0]?.about || "",
        image: data.user?.[0]?.image || "",
        streetAddress: data.user?.[0]?.streetAddress || "",
        city: data.user?.[0]?.city || "",
        state: data.user?.[0]?.state || "",
        postalCode: data.user?.[0]?.postalCode || "",
        country: data.user?.[0]?.country || "",
        taxId: data.user?.[0]?.taxId || "",
        socialMedia: data.user?.[0]?.socialMedia || {},
      });
    }
  }, [data, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateMutation.mutateAsync(values);
    } catch (error) {
      console.error("Form submission error:", error);
      // Error is already handled by the mutation
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-3">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-1 h-4 w-96" />
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <Loading variant="form" className="space-y-6" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-500">Failed to load profile data</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ["userData"] });
              toast.info("Refreshing profile data...");
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 md:grid-cols-3">
            <div>
              <h2 className="text-base/7 font-semibold text-foreground">
                Profile
              </h2>
              <p className="mt-1 text-sm/6 text-muted-foreground">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="sm:col-span-4">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <p className="mt-3 text-sm/6 text-gray-600">
                      Write a few sentences about yourself.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-full">
                <Label htmlFor="photo">Photo</Label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    aria-hidden="true"
                    className="size-12 text-gray-300"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                  >
                    Change
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-x-8 md:grid-cols-3">
            <div>
              <h2 className="text-base/7 font-semibold text-foreground">
                Personal Information
              </h2>
              <p className="mt-1 text-sm/6 text-muted-foreground">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="sm:col-span-4">
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxId"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>Tax ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Street address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3 sm:col-start-1">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>State / Province</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>ZIP / Postal code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="button"
              variant="ghost"
              disabled={updateMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
