import { Exam } from "@/types";
import { FILE_URL } from "@/utils/constants";
import { Image, Chip } from "@mantine/core";
import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from "mantine-react-table";
import { Box, Button, Flex, Menu, Text, Title, ActionIcon } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import PartExpanded from "./expanded/PartExpanded";
interface ExamTableProps {
  data: Exam[];
}
export default function ExamsTable({ data }: ExamTableProps) {
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
            accessorKey: "thumbnail_path",
            header: "Thumbnail",
            Cell: ({ renderedCellValue }) => (
              <Box>
                {renderedCellValue ? (
                  <Image src={`${FILE_URL}${renderedCellValue}`} alt="preview" h={150} />
                ) : (
                  <Chip color="blue" variant="outline">
                    No have thumbnail
                  </Chip>
                )}
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
        <PartExpanded />
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        <ActionIcon
          color="orange"
          onClick={() => {
            table.setEditingRow(row);
          }}>
          <IconEdit />
        </ActionIcon>
        <ActionIcon color="red" onClick={() => {}}>
          <IconTrash />
        </ActionIcon>
      </Box>
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
      return (
        <Flex p="md" justify="space-between">
          <Flex gap="xs">
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
          <Flex sx={{ gap: "8px" }}>
            <Button color="red" disabled={!table.getIsSomeRowsSelected()} onClick={handleDeactivate} variant="filled">
              Delete
            </Button>
            <Button color="green" disabled={!table.getIsSomeRowsSelected()} onClick={handleActivate} variant="filled">
              Activate
            </Button>
          </Flex>
        </Flex>
      );
    },
  });
  return <MantineReactTable table={table} />;
}
