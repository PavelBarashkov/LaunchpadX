import { Field, ErrorMessage, FieldInputProps, FieldMetaProps } from "formik";
import TextField from "@mui/material/TextField";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Error } from "@/components/Form/Error/Error";

const Step2 = () => (
  <>
    <Box>
      <Field name="goal" as="input">
        {({
          field,
          meta,
        }: {
          field: FieldInputProps<string>;
          meta: FieldMetaProps<string>;
        }) => (
          <TextField
            {...field}
            label="Цель сбора"
            variant="outlined"
            type="number"
            fullWidth
            error={meta.touched && Boolean(meta.error)}
          />
        )}
      </Field>
      <ErrorMessage name="goal">{(msg) => <Error>{msg}</Error>}</ErrorMessage>
    </Box>
    <Box>
      <Field name="currency" as="select" className="my-select">
        {({
          field,
          meta,
        }: {
          field: FieldInputProps<string>;
          meta: FieldMetaProps<string>;
        }) => (
          <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
            <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
            <Select
              {...field}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Валюта"
            >
              <MenuItem value={"USDT"}>USDT</MenuItem>
              <MenuItem value={"ETH"}>ETH</MenuItem>
              <MenuItem value={"BNB"}>BNB</MenuItem>
            </Select>
          </FormControl>
        )}
      </Field>
      <ErrorMessage name="currency">
        {(msg) => <Error>{msg}</Error>}
      </ErrorMessage>
    </Box>
  </>
);

export default Step2;
