import * as React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../DataTable";
import { Exam } from "@/types";
import { FILE_URL } from "@/utils/constants";
import { Image } from "@chakra-ui/react";
import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from "mantine-react-table";
import { Box, Button, Flex, Menu, Text, Title } from "@mantine/core";
import { IconUserCircle, IconSend } from "@tabler/icons-react";
// const columnHelper = createColumnHelper<Exam>();
// const columns = [
//   columnHelper.accessor("name", {
//     cell: (info) => info.getValue(),
//     header: "Name",
//   }),
//   columnHelper.accessor("audio_file", {
//     cell: (info) => info.getValue(),
//     header: "Audio File",
//   }),
//   columnHelper.accessor("date", {
//     cell: (info) => info.getValue(),
//     header: "Date",
//   }),
//   columnHelper.accessor("thumbnail_path", {
//     cell: (info) => <Image src={`${FILE_URL}${info.getValue()}`} alt="preview" boxSize={100} objectFit='contain' />,
//     header: "Thumbnail",
//   }),
//   columnHelper.accessor("is_published", {
//     cell: (info) => info.getValue() ? 'true' : 'false',
//     header: "Publish",
//   }),
// ];
interface ExamTableProps {
  data: Exam[];
}
// export default function ExamsTable({ data }: ExamTableProps) {
// return <DataTable columns={columns} data={data} />;
// }
const ExamsTable = ({ data }: ExamTableProps) => {
  const columns = useMemo<MRT_ColumnDef<Exam>[]>(
    () => [
      {
        id: "name",
        header: "Name",
        columns: [
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "audio_file",
            header: "Audio File",
            Cell: ({ renderedCellValue }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}>
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "type",
            header: "Type",
            Cell: ({ renderedCellValue }) => (
              <Box
                sx={(theme) => ({
                  borderRadius: "4px",
                  color: "#fff",
                  maxWidth: "9ch",
                  padding: "4px",
                  backgroundColor: theme.colors.yellow[9],
                })}>
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => {
              const sDay = new Date(row.date);
              sDay.setHours(0, 0, 0, 0);
              return sDay;
            },
            accessorKey: "date",
            header: "Date",
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
          },
        ],
      },
    ],
    []
  );
  const table = useMantineReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enablePinning: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: { showColumnFilters: false, showGlobalFilter: true },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    mantinePaginationProps: {
      radius: "xl",
      size: "lg",
    },
    mantineSearchTextInputProps: {
      placeholder: "Search Test",
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "16px",
          padding: "16px",
        }}>
        {/* <img alt="avatar" height={200} src={row.original.avatar} style={{ borderRadius: "50%" }} />
        <Box sx={{ textAlign: "center" }}>
          <Title>Signature Catch Phrase:</Title>
          <Text>&quot;{row.original.signatureCatchPhrase}&quot;</Text>
        </Box> */}
      </Box>
    ),
    renderRowActionMenuItems: () => (
      <>
        <Menu.Item icon={<IconUserCircle />}>View Profile</Menu.Item>
        <Menu.Item icon={<IconSend />}>Send Email</Menu.Item>
      </>
    ),
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("deactivating " + row.getValue("name"));
        });
      };
      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("activating " + row.getValue("name"));
        });
      };
      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("contact " + row.getValue("name"));
        });
      };
      return (
        <Flex p="md" justify="space-between">
          <Flex gap="xs">
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
          <Flex sx={{ gap: "8px" }}>
            <Button color="red" disabled={!table.getIsSomeRowsSelected()} onClick={handleDeactivate} variant="filled">
              Deactivate
            </Button>
            <Button color="green" disabled={!table.getIsSomeRowsSelected()} onClick={handleActivate} variant="filled">
              Activate
            </Button>
            <Button color="blue" disabled={!table.getIsSomeRowsSelected()} onClick={handleContact} variant="filled">
              Contact
            </Button>
          </Flex>
        </Flex>
      );
    },
  });
  return <MantineReactTable table={table} />;
};
export default ExamsTable;
