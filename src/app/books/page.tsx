import { BookTable } from "@/components/tables/bookTable";
import { api } from "@/trpc/server";


const page = async () => {
  const books = await api.book.findMany.query();
  return (
    <div>
      <BookTable data={books} />
    </div>
  );
};

export default page;
