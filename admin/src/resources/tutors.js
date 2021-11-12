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
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  TopToolbar,
  useListContext,
  PasswordInput,
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

export const TutorList = (props) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="email" />
      <TextField source="countryCode" />
      <TextField source="phone" />
      <TextField source="hasImage" />
      <EditButton />
    </Datagrid>
  </List>
);

export const TutorCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="email" validate={required()} />
      <TextInput source="countryCode" validate={required()} />
      <TextInput source="phone" validate={required()} />
      <TextInput source="password" validate={required()} />
      <TextInput source="hasImage" />
    </SimpleForm>
  </Create>
);

export const TutorEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="email" validate={required()} />
      <TextInput source="countryCode" validate={required()} />
      <TextInput source="phone" validate={required()} />
      <PasswordInput source="password" validate={required()} />
      <TextInput source="hasImage" />
    </SimpleForm>
  </Edit>
);

export const TutorShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" />
      <TextInput source="countryCode" />
      <TextInput source="phone" />
    </SimpleShowLayout>
  </Show>
);
