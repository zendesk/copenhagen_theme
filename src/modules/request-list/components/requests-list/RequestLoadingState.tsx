import { Skeleton } from "@zendeskgarden/react-loaders";
import { Table } from "@zendeskgarden/react-tables";
import { Grid } from "@zendeskgarden/react-grid";
import styled from "styled-components";

const SkeletonCells = () => (
  <Table.Row>
    <Table.Cell>
      <Skeleton />
    </Table.Cell>
    <Table.Cell>
      <Skeleton />
    </Table.Cell>
    <Table.Cell>
      <Skeleton />
    </Table.Cell>
  </Table.Row>
);

const NoLeftPaddingCol = styled(Grid.Col)`
  padding-left: 0;
`;

export const RequestLoadingState = () => {
  return (
    <>
      <Grid>
        <NoLeftPaddingCol>
          <Skeleton width="50%" />
        </NoLeftPaddingCol>
        <NoLeftPaddingCol>
          <Skeleton width="30%" />
        </NoLeftPaddingCol>
        <NoLeftPaddingCol>
          <Skeleton width="40%" />
        </NoLeftPaddingCol>
        <NoLeftPaddingCol>
          <Skeleton width="50%" />
        </NoLeftPaddingCol>
      </Grid>

      <Table style={{ minWidth: 400 }}>
        <Table.Head>
          <Table.HeaderRow>
            <Table.HeaderCell>
              <Skeleton width="40%" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Skeleton width="40%" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Skeleton width="40%" />
            </Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Head>
        <Table.Body>
          <SkeletonCells />
          <SkeletonCells />
          <SkeletonCells />
        </Table.Body>
      </Table>
    </>
  );
};
