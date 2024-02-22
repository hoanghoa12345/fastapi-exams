import { Card, Container, Heading, SimpleGrid, Text, CardBody, Icon, VStack, HStack, CardBodyProps } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { FaBlog, FaUser } from "react-icons/fa";
import { SiVitest } from "react-icons/si";

export default function Dashboard() {
  return (
    <Container maxWidth="container.xl">
      <Heading as="h4" size="md" mb={5}>
        Hi, Welcome back 👋
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={4}>
        <AppWidgetSummary title="Total Tests" total={4} color="blue.500" icon={SiVitest} />
        <AppWidgetSummary title="Total Users" total={1} color="green.500" icon={FaUser} />
        <AppWidgetSummary title="Total Joined" total={1} color="orange.500" icon={FaUser} />
        <AppWidgetSummary title="Total Blog" total={1} color="purple.500" icon={FaBlog} />
      </SimpleGrid>
    </Container>
  );
}

type AppWidgetSummaryProps = CardBodyProps & {
  title: string;
  total: number;
  color: string;
  icon: IconType;
};

const AppWidgetSummary = ({ title, total, color, icon, ...restProps }: AppWidgetSummaryProps) => {
  return (
    <Card>
      <CardBody as={HStack} justifyContent="center" px={6} py={5} borderRadius={2} {...restProps}>
        {icon && <Icon boxSize={10} as={icon} color={color} />}

        <VStack flex={1} spacing={0.5}>
          <Heading as="h4">{total}</Heading>
          <Text>{title}</Text>
        </VStack>
      </CardBody>
    </Card>
  );
};
