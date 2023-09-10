"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import React from "react";
import z from "zod";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronsUpDownIcon,
  MoreVerticalIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SECTIONS = {
  personalDetails: PersonalDetails,
  skills: Skills,
};

type SectionProps = {
  index: number;
};

const defaultValues: Schema = {
  sections: [
    {
      title: "Personal Details",
      type: "personalDetails",
      firstName: "",
      lastName: "",
      city: "",
      country: "",
      postalCode: "",
      drivingLicense: "",
      dateOfBirth: "",
      placeOfBirth: "",
      nationality: "",
      address: "",
      email: "",
      phone: "",
      summary: "",
      wantedJobTitle: "",
    },
    {
      title: "Skills",
      type: "skills",
      skills: [],
    },
  ],
};

/**
 * Schemas for all possible sections of the resume
 */

const personalDetailsSchema = z.object({
  type: z.literal("personalDetails"),
  title: z.string().default("Personal Details"),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  country: z.string(),
  city: z.string(),
  address: z.string(),
  postalCode: z.string(),
  drivingLicense: z.string(),
  nationality: z.string(),
  placeOfBirth: z.string(),
  dateOfBirth: z.string(),
  summary: z.string(),
  wantedJobTitle: z.string(),
});

const skillsSchema = z.object({
  type: z.literal("skills"),
  title: z.string().default("Skills"),
  skills: z.array(
    z.object({
      name: z.string(),
      level: z.enum([
        "novice",
        "beginner",
        "intermediate",
        "advanced",
        "expert",
      ]),
    })
  ),
});

const schema = z.object({
  sections: z.array(
    z.discriminatedUnion("type", [personalDetailsSchema, skillsSchema])
  ),
});

type Schema = z.infer<typeof schema>;

/**
 * Components for all possible sections of the resume
 */

function PersonalDetails(props: SectionProps) {
  const methods = useFormContext<Schema>();

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-xl font-medium">
        {methods.watch(`sections.${props.index}.title`)}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        <FormField
          control={methods.control}
          name={`sections.${props.index}.firstName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.lastName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.phone`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.country`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.city`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="space-x-2">
            <span>Edit additional details</span>
            <ChevronsUpDownIcon className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            <FormField
              control={methods.control}
              name={`sections.${props.index}.address`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.postalCode`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Postal Code" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.drivingLicense`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driving License</FormLabel>
                  <FormControl>
                    <Input placeholder="Driving License" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.nationality`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input placeholder="Nationality" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.placeOfBirth`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="Place of Birth" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.dateOfBirth`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="Date of Birth" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <FormField
        control={methods.control}
        name={`sections.${props.index}.summary`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Summarize your qualifications and strengths in 2-3 sentences."
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </section>
  );
}

function Skills(props: SectionProps) {
  const methods = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: `sections.${props.index}.skills`,
  });

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h3 className="text-xl font-medium">
          {methods.watch(`sections.${props.index}.title`)}
        </h3>
        <p className="text-sm text-muted-foreground">
          Select 5 relevant skills that align with the job requirements. Ensure
          they resonate with the key skills highlighted in the job post,
          especially for online applications.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex flex-1 flex-col h-auto items-start"
                  >
                    <span>
                      {methods.watch(
                        `sections.${props.index}.skills.${index}.name`
                      ) || "(Not specified)"}
                    </span>
                    <span className="text-muted-foreground font-normal capitalize text-sm">
                      {methods.watch(
                        `sections.${props.index}.skills.${index}.level`
                      )}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="">
                  <DialogHeader>
                    <DialogTitle>Edit skill</DialogTitle>
                    <DialogDescription>
                      {methods.watch(
                        `sections.${props.index}.skills.${index}.name`
                      ) || "(Not specified)"}
                    </DialogDescription>
                  </DialogHeader>
                  <FormField
                    control={methods.control}
                    name={`sections.${props.index}.skills.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name={`sections.${props.index}.skills.${index}.level`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Level -{" "}
                          <span className="text-muted-foreground font-normal capitalize">
                            {methods.watch(
                              `sections.${props.index}.skills.${index}.level`
                            )}
                          </span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value="novice"
                                  className={cn({
                                    "bg-primary": [
                                      "novice",
                                      "beginner",
                                      "intermediate",
                                      "advanced",
                                      "expert",
                                    ].includes(field.value),
                                  })}
                                />
                              </FormControl>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value="beginner"
                                  className={cn({
                                    "bg-primary": [
                                      "beginner",
                                      "intermediate",
                                      "advanced",
                                      "expert",
                                    ].includes(field.value),
                                  })}
                                />
                              </FormControl>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value="intermediate"
                                  className={cn({
                                    "bg-primary": [
                                      "intermediate",
                                      "advanced",
                                      "expert",
                                    ].includes(field.value),
                                  })}
                                />
                              </FormControl>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value="advanced"
                                  className={cn({
                                    "bg-primary": [
                                      "advanced",
                                      "expert",
                                    ].includes(field.value),
                                  })}
                                />
                              </FormControl>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value="expert"
                                  className={cn({
                                    "bg-primary": ["expert"].includes(
                                      field.value
                                    ),
                                  })}
                                />
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </DialogContent>
              </Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" type="button">
                    <MoreVerticalIcon className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Trash2Icon className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Would you like to remove this skill?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. The skill &nbsp;
                          <span>
                            {methods.watch(
                              `sections.${props.index}.skills.${index}.name`
                            ) || "(Not specified)"}
                          </span>
                          &nbsp; will be permanently removed from your resume.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => remove(index)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </div>

      <Button
        variant="ghost"
        type="button"
        onClick={() => append({ name: "", level: "novice" })}
      >
        <PlusIcon className="w-4 h-4" /> Add more skills
      </Button>
    </section>
  );
}

export default function ResumeForm() {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { fields } = useFieldArray({
    control: methods.control,
    name: "sections",
  });

  function onSubmit(values: Schema) {
    console.log(values);
  }

  return (
    <div className="p-8 sm:px-12">
      <Form {...methods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {fields.map((field, index) => {
            const Section = SECTIONS[field.type];
            return <Section index={index} key={field.id} />;
          })}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
