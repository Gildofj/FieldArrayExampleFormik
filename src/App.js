import "./styles.css";
import { Form, FieldArray, Formik, Field } from "formik";
import React, { Fragment } from "react";
import { TextField } from "formik-material-ui";
import { Button, ListSubheader, MenuItem, Grid } from "@material-ui/core";

const INITIAL_VALUES = {
  prato: "",
  cliente: "",
  carne: "",
  ponto: "",
  sobremesa: "",
  bebidas: [
    {
      nome: "Suco",
      quantia: 12
    }
  ]
};

export default function App() {
  async function submit(values) {
    console.log(values);
  }

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={submit}>
      {({ values, handleSubmit }) => (
        <Form>
          <Field
            component={TextField}
            fullWidth
            select
            name="prato"
            label="Tipo de prato"
          >
            <ListSubheader>Escolha seu prato</ListSubheader>
            <MenuItem value="1">Churrasco</MenuItem>
            <MenuItem value="2">Sobremesa</MenuItem>
          </Field>

          <Field
            component={TextField}
            name="cliente"
            fullWidth
            label="Diga o nome da comanda"
          />

          {values.prato === "1" && <SelectCarnes />}

          {values.prato === "2" && <SelectSobremesa />}

          <FieldArray
            name="bebidas"
            render={(helpers) => (
              <>
                {values.bebidas.map((bebida, index) => (
                  <Grid key={index}>
                    <Field
                      component={TextField}
                      name={`bebidas.${index}.nome`}
                      label="Nome da bebida"
                    />

                    <Field
                      component={TextField}
                      name={`bebidas.${index}.quantia`}
                      label="Quantas copos"
                    />

                    <Button onClick={() => helpers.remove(index)}>
                      Remover
                    </Button>
                  </Grid>
                ))}

                <Button onClick={() => helpers.push({ nome: "", quantia: "" })}>
                  Adicionar
                </Button>
              </>
            )}
          />

          <Button onClick={handleSubmit}>Enviar</Button>
        </Form>
      )}
    </Formik>
  );
}

function SelectCarnes() {
  return (
    <>
      <Field
        fullWidth
        component={TextField}
        name="carne"
        select
        label="Qual carne?"
      >
        {[
          { id: 1, nome: "suína" },
          { id: 2, nome: "bovina" }
        ].map((carne) => (
          <MenuItem key={carne.id} value={carne.id}>
            {carne.nome}
          </MenuItem>
        ))}
      </Field>

      <Field
        fullWidth
        component={TextField}
        name="ponto"
        label="Qual ponto da carne?"
      />
    </>
  );
}

function SelectSobremesa() {
  return (
    <Field
      fullWidth
      component={TextField}
      select
      name="sobremesa"
      label="Qual sobremesa?"
    >
      <MenuItem value="1">Fruta</MenuItem>
      <MenuItem value="2">Pudim</MenuItem>
    </Field>
  );
}
