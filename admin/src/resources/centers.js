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

export const CenterList = (props) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="address" />
      <TextField source="longitude" />
      <TextField source="latitude" />
      <EditButton />
    </Datagrid>
  </List>
);

export const CenterCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="address" validate={required()} />
      <TextInput source="longitude" />
      <TextInput source="latitude" />
    </SimpleForm>
  </Create>
);

export const CenterEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput
        source="name"
        parse={(v) => JSON.parse(v)}
        format={(v) => JSON.stringify(v)}
        validate={required()}
      />
      <TextInput
        source="address"
        parse={(v) => JSON.parse(v)}
        format={(v) => JSON.stringify(v)}
        validate={required()}
      />

      {/* <JSONEditor source="name" validate={required()} />
      <JSONEditor source="address" validate={required()} /> */}
      <TextInput source="longitude" />
      <TextInput source="latitude" />
    </SimpleForm>
  </Edit>
);
