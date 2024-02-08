import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { insertPost } from "../state/postSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import withGuard from "../util/withGuard";
import { useFormik } from "formik";
import * as Yup from "yup";
const formSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(10, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const Add = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.posts);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      const id = { id: Math.floor(Math.random() * 50).toString() };
      dispatch(
        insertPost({
          ...id,
          title: values.title,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          alert(`Error: ${error}`);
        });
    },
  });
  return (
    <Loading loading={loading} error={error}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            isInvalid={!!formik.errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            isInvalid={!!formik.errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.description}
          </Form.Control.Feedback>
        </Form.Group>
        <Loading loading={loading} error={error}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Loading>
      </Form>
    </Loading>
  );
};

export default withGuard(Add);
