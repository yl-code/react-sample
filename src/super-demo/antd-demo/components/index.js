import _Form from "./Form";
import { useForm } from "./useForm";

const Form = _Form;
Form.useForm = useForm;

export { Form };
export * from "./Input";
export * from "./Field";
