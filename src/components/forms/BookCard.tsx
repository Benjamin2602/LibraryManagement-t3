"use client";
import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import Link from "next/dist/client/link";
import toast from "react-hot-toast";

export function BookCard() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const formSchema = z.object({
    title: z.string(),
    author: z.string(),
    subject: z.string(),
    publishedDate: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      subject: "",
      publishedDate: "",
    },
  });

  const createBook = api.book.addBook.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    startTransition(async () => {
      await createBook.mutateAsync({
        title: values.title,
        author: values.author,
        subject: values.subject,
        publishedDate: new Date(values.publishedDate),
      });
      toast.success("New Book added");
      router.push("/books");
    });
  }

  return (
    <Card className="mx-auto mt-10 w-[550px]">
      <CardHeader>
        <CardTitle>Add Books</CardTitle>
        <CardDescription>Books which you like </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="author" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="framework">Genre</Label>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger id="framework">
                          <SelectValue
                            placeholder="select the genre"
                            {...field}
                          />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="motivation">Motivation</SelectItem>
                          <SelectItem value="love">Love</SelectItem>
                          <SelectItem value="horror">Horror</SelectItem>
                          <SelectItem value="comedy">Comedy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="date published"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              <Button type="submit" className=" bg-indigo-600">
                Add Books
              </Button>
            </div>
          </form>
        </Form>
        <Button className="mt-4 inline bg-green-500 ">
          <Link href="/books">Books</Link>
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
