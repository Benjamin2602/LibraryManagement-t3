import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { api } from "@/trpc/server";
import { Button } from "../ui/button";
import Link from "next/link";

const BookTable = async () => {
  const books = await api.book.findMany.query();
  return (
    <div>
      <h1 className="text-center text-3xl font-bold ">
        Displaying The list of books
      </h1>
      <Table className="mx-auto mt-3 w-1/2 border">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>publishedDate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="mx-auto w-1/2">
          {books?.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.subject}</TableCell>
              <TableCell>{book.publishedDate.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center">
        <Button className="mt-2 bg-lime-600">
          <Link href="/">Add Books</Link>
        </Button>
      </div>
    </div>
  );
};

export default BookTable;
