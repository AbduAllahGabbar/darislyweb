import * as React from "react";
import { cloneElement } from "react";
import {
  Create,
  CreateButton,
  Datagrid,
  Edit,
  EditButton,
  ExportButton,
  List,
  ListButton,
  required,
  sanitizeListRestProps,
  SimpleForm,
  TextField,
  TextInput,
  TopToolbar,
  useListContext,
  ReferenceField,
  DateInput,
} from "react-admin";

const ListActions = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    hasCreate,
    basePath,
    selectedIds,
    showFilter,
    total,
  } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button",
        })}
      <ListButton basePath={basePath} />
      <CreateButton basePath={basePath} />
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filterValues={filterValues}
        maxResults={maxResults}
      />
    </TopToolbar>
  );
};

export const ProductList = (props) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="type" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="type" validate={required()} />
    </SimpleForm>
  </Create>
);

export const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="type" validate={required()} />
    </SimpleForm>
  </Edit>
);
