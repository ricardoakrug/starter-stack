"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { settingsFormSchema } from "@/lib/schemas/profile";
import { SettingsFormValues } from "@/lib/types/profile";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserData, updateUserSettings } from "@/lib/actions/user/user";
import { useEffect } from "react";
import { EmailFrequency } from "@/lib/types/enums";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/ui/loading";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsForm() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    retry: 1,
  });

  const updateMutation = useMutation({
    mutationFn: async (values: SettingsFormValues) => {
      return updateUserSettings(values);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userData"] });

      toast.success("Notification settings updated successfully", {
        description: "Your changes have been saved.",
      });
    },
    onError: error => {
      toast.error("Failed to update notification settings", {
        description: "Please try again or contact support if the problem persists.",
      });
      console.error("[NOTIFICATIONS_UPDATE]", error);
    },
  });

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      emailEnabled: true,
      emailFrequency: "daily",
      emailAccountUpdates: true,
      emailSecurityAlerts: true,
      emailMarketing: true,
      pushEnabled: true,
      pushAccountUpdates: true,
      pushSecurityAlerts: true,
      pushMarketing: true,
      locale: "en",
      language: "en",
    },
  });

  // Watch the main switches for reactive updates
  const emailEnabled = form.watch("emailEnabled");
  const pushEnabled = form.watch("pushEnabled");

  // Update form values when data is loaded
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        emailEnabled: data.settings?.emailEnabled ?? true,
        emailFrequency: (data.settings?.emailFrequency as EmailFrequency) || "daily",
        emailAccountUpdates: data.settings?.emailAccountUpdates ?? true,
        emailSecurityAlerts: data.settings?.emailSecurityAlerts ?? true,
        emailMarketing: data.settings?.emailMarketing ?? true,
        pushEnabled: data.settings?.pushEnabled ?? true,
        pushAccountUpdates: data.settings?.pushAccountUpdates ?? true,
        pushSecurityAlerts: data.settings?.pushSecurityAlerts ?? true,
        pushMarketing: data.settings?.pushMarketing ?? true,
        locale: data.settings?.locale || "en",
        language: data.settings?.language || "en",
      });
    }
  }, [data, form]);

  const onSubmit = async (values: SettingsFormValues) => {
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
          <div className="max-w-2xl space-y-10 md:col-span-2">
            <fieldset>
              <Skeleton className="h-5 w-32" />
              <div className="mt-6 space-y-6">
                <Loading variant="form" className="space-y-6" />
              </div>
            </fieldset>
            <fieldset>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="mt-1 h-4 w-64" />
              <div className="mt-6 space-y-6">
                <Loading variant="form" className="space-y-6" />
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-500">Failed to load notification settings</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ["userData"] });
              toast.info("Refreshing notification settings...");
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-3">
          <div>
            <h2 className="text-base/7 font-semibold text-foreground">Notifications</h2>
            <p className="mt-1 text-sm/6 text-muted-foreground">
              We&apos;ll always let you know about important changes, but you pick what else you
              want to hear about.
            </p>
          </div>

          <div className="max-w-2xl space-y-10 md:col-span-2">
            <fieldset>
              <legend className="text-sm/6 font-semibold text-foreground">By email</legend>
              <div className="mt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="emailEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="text-sm/6">
                        <FormLabel>Email notifications</FormLabel>
                        <p className="text-muted-foreground">
                          Enable or disable all email notifications.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={checked => {
                            field.onChange(checked);
                            // If email is disabled, disable all email-related switches
                            if (!checked) {
                              form.setValue("emailAccountUpdates", false);
                              form.setValue("emailSecurityAlerts", false);
                              form.setValue("emailMarketing", false);
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailAccountUpdates"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="text-sm/6">
                        <FormLabel>Account updates</FormLabel>
                        <p className="text-muted-foreground">
                          Get notified about changes to your account.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!emailEnabled}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailSecurityAlerts"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="text-sm/6">
                        <FormLabel>Security alerts</FormLabel>
                        <p className="text-muted-foreground">
                          Get notified about security-related events.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!emailEnabled}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailMarketing"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="text-sm/6">
                        <FormLabel>Marketing emails</FormLabel>
                        <p className="text-muted-foreground">
                          Receive marketing and promotional emails.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!emailEnabled}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm/6 font-semibold text-foreground">
                Push notifications
              </legend>
              <p className="mt-1 text-sm/6 text-muted-foreground">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="pushEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="text-sm/6">
                        <FormLabel>Push notifications</FormLabel>
                        <p className="text-muted-foreground">
                          Enable or disable all push notifications.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={checked => {
                            field.onChange(checked);
                            // If push is disabled, disable all push-related switches
                            if (!checked) {
                              form.setValue("pushAccountUpdates", false);
                              form.setValue("pushSecurityAlerts", false);
                              form.setValue("pushMarketing", false);
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pushAccountUpdates"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="text-sm/6">
                        <FormLabel>Account updates</FormLabel>
                        <p className="text-muted-foreground">
                          Get notified about changes to your account.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!pushEnabled}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pushSecurityAlerts"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="text-sm/6">
                        <FormLabel>Security alerts</FormLabel>
                        <p className="text-muted-foreground">
                          Get notified about security-related events.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!pushEnabled}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pushMarketing"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="text-sm/6">
                        <FormLabel>Marketing notifications</FormLabel>
                        <p className="text-muted-foreground">
                          Receive marketing and promotional notifications.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!pushEnabled}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>
          </div>
        </div>

        <Separator />

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button type="button" variant="ghost" disabled={updateMutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
