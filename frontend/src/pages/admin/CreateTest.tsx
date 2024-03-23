import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Stack } from "@chakra-ui/react";

import ExamsTable from "@/components/tables/exams";
import { Exam } from "@/types";
import ModalCreate from "@/components/modals/exams/create";
import { ExamAdminAPI } from "@/services/admin/examAdminApi";

const CreateTest = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    const fetchExams = async () => {
      const { data } = await ExamAdminAPI.getAll();
      setExams(data);
    };
    fetchExams();
  }, [reload]);

  return (
    <>
      <Stack pb={4} spacing={4} direction="row" justifyContent="end">
        <Button colorScheme="messenger" fontWeight="md" onClick={() => setOpen(true)}>
          Create
        </Button>
      </Stack>
      <Card>
        <CardBody>
          <ExamsTable data={exams} />
        </CardBody>
      </Card>
      <ModalCreate isOpen={open} onClose={() => setOpen(false)} handleReload={handleReload} />
    </>
  );
};
export default CreateTest;
