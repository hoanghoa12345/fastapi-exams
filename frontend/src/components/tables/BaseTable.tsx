import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

export type TableColumn<T> = {
  title: string;
  dataIndex: keyof T;
  key: string;
};

type BaseTableProps<T> = {
  columns: TableColumn<T>[];
  dataSource: T[];
  viewAction: (id: string) => void;
  editAction: (id: string) => void;
};

const BaseTable = <T extends Record<string, any>>({ columns, dataSource, viewAction, editAction }: BaseTableProps<T>) => {
  return (
    <Box p={3} border={1} borderStyle={"solid"} borderRadius={"lg"} borderColor={"gray.100"} marginTop={5}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={column.key}>{column.title}</Th>
              ))}
              <Th textAlign={"right"}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataSource.map((item) => (
              <Tr key={item.id}>
                {columns.map((column) => (
                  <Td key={column.key}>{item[column.dataIndex]}</Td>
                ))}
                <Td textAlign={"right"}>
                  <Button variant={"ghost"} onClick={() => viewAction(item.id)}>
                    <i className="bx bx-show bx-sm" />
                  </Button>
                  <Button variant={"ghost"} onClick={() => editAction(item.id)}>
                    <i className="bx bx-edit bx-sm" />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BaseTable;
