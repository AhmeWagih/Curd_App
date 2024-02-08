import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const PostListItem = ({ data, deleteRecord, isLoggedIn }) => {
  //const deleteHandler = (item) => {
  //if (window.confirm(`Delete post "${item.title}"?`)) {
  //deleteRecord(item.id);
  //}
  //};
  const navigate = useNavigate();
  const records = data.map((el, idx) => (
    <tr key={el.id}>
      <td style={{ fontWeight: "bold" }}>{++idx}</td>
      <td>
        <Link
          style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
          to={`/post/${el.id}`}
        >
          {el.title}
        </Link>
      </td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="success"
            style={{ marginRight: "10px", borderRadius: "5px" }}
            onClick={() => navigate(`post/${el.id}/edit`)}
            disabled={!isLoggedIn}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            style={{ borderRadius: "5px" }}
            onClick={() => deleteRecord(el.id)}
            disabled={!isLoggedIn}
          >
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  return <>{records}</>;
};

export default PostListItem;
