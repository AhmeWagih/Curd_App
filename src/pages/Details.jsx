import { Table } from "react-bootstrap";
import Loading from "../components/Loading";
import UsePostDetails from "../hooks/use-post-details";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cleanRecord } from "../state/postSlice";
const Details = () => {
  const { loading, error, record } = UsePostDetails();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(cleanRecord());
    };
  }, [dispatch]);
  return (
    <div>
      <Loading loading={loading} error={error}>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID: {record?.id}</th>
          <th>Title: {record?.title}</th>
          <th> Description: {record?.description}</th>
        </tr>
      </thead>
    </Table>
      </Loading>
    </div>
  );
};

export default Details;
