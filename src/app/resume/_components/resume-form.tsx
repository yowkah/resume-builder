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

import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import React from "react";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronsUpDownIcon } from "lucide-react";

const SECTIONS = {
  personalDetails: PersonalDetails,
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
  ],
};

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

type PersonalDetailsSchema = z.infer<typeof personalDetailsSchema>;

type PersonalDetailsProps = {
  field: PersonalDetailsSchema;
  index: number;
};

function PersonalDetails(props: PersonalDetailsProps) {
  const methods = useFormContext();

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-xl font-medium">{props.field.title}</h3>
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
    </section>
  );
}

const schema = z.object({
  sections: z.array(z.discriminatedUnion("type", [personalDetailsSchema])),
});

type Schema = z.infer<typeof schema>;

export default function ResumeForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  function onSubmit(values: Schema) {
    console.log(values);
  }

  return (
    <div className="p-8 sm:px-12">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {fields.map((field, index) => {
            const Section = SECTIONS[field.type];
            return <Section field={field} index={index} key={field.id} />;
          })}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
