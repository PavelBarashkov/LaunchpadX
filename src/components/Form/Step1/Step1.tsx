import { Field, ErrorMessage, FieldInputProps, FieldMetaProps } from "formik";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { Error } from "@/components/Form/Error/Error";

const Step1 = () => (
  <>
    <Box>
      <Field name="title" as="input">
        {({
          field,
          meta,
        }: {
          field: FieldInputProps<string>;
          meta: FieldMetaProps<string>;
        }) => (
          <TextField
            {...field}
            label="Название проекта"
            variant="outlined"
            error={meta.touched && Boolean(meta.error)}
            fullWidth
          />
        )}
      </Field>
      <ErrorMessage name="title">{(msg) => <Error>{msg}</Error>}</ErrorMessage>
    </Box>
    <Box>
      <Field name="description" as="input">
        {({
          field,
          meta,
        }: {
          field: FieldInputProps<string>;
          meta: FieldMetaProps<string>;
        }) => (
          <TextField
            {...field}
            label="Краткое описание"
            variant="outlined"
            error={meta.touched && Boolean(meta.error)}
            fullWidth
            multiline
            rows={4}
          />
        )}
      </Field>
      <ErrorMessage name="description">
        {(msg) => <Error>{msg}</Error>}
      </ErrorMessage>
    </Box>
  </>
);

export default Step1;
