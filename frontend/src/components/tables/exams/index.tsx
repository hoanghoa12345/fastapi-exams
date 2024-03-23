import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../DataTable";
import { Exam } from "@/types";
import { FILE_URL } from "@/utils/constants";
import { Image } from "@chakra-ui/react";

const columnHelper = createColumnHelper<Exam>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  columnHelper.accessor("audio_file", {
    cell: (info) => info.getValue(),
    header: "Audio File",
  }),
  columnHelper.accessor("date", {
    cell: (info) => info.getValue(),
    header: "Date",
  }),
  columnHelper.accessor("thumbnail_path", {
    cell: (info) => <Image src={`${FILE_URL}${info.getValue()}`} alt="preview" boxSize={100} objectFit='contain'/>,
    header: "Thumbnail",
  }),
  columnHelper.accessor("is_published", {
    cell: (info) => info.getValue() ? 'true' : 'false',
    header: "Publish",
  }),
];

interface ExamTableProps {
  data: Exam[]
}

export default function ExamsTable({data}: ExamTableProps) {
  return <DataTable columns={columns} data={data} />;
}
