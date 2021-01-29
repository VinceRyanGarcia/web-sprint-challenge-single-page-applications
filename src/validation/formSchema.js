// Here goes the schema for the form
import * as yup from "yup";

export default yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Username must be 2 chars long"),
  size: yup
    .string()
    .oneOf(["medium", "large", "extralarge"], "Size is required"),
  cheese: yup.boolean(),
  pepperoni: yup.boolean(),
  sausage: yup.boolean(),
  mushroom: yup.boolean(),
  instructions: yup
  .string()
  .min(0, "Username must be 0 chars long"),
});
