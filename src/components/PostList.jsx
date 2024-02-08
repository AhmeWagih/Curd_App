import { Table } from "react-bootstrap";
import PostListItem from "./PostListItem";
import { memo } from "react";
const PostList = ({ data, deleteRecord, isLoggedIn }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: "15%" }}>#</th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "15%" }}>Opration</th>
        </tr>
      </thead>
      <tbody>
        <PostListItem
          data={data}
          deleteRecord={deleteRecord}
          isLoggedIn={isLoggedIn}
        />
      </tbody>
    </Table>
  );
};

export default memo(PostList);
