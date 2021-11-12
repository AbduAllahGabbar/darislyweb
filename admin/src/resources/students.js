import * as React from "react";
import { cloneElement } from "react";
import {
  Create,
  CreateButton,
  Datagrid,
  Edit,
  EditButton,
  ExportButton,
  Filter,
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

const SearchFilter = (props) => (
  <Filter {...props}>
    <TextInput label="First Name" source="firstName" />
    <TextInput label="Last Name" source="lastName" />
    <TextInput label="Phone" source="phone" />
    <TextInput label="Email" source="email" />
  </Filter>
);

export const StudentList = (props) => (
  <List {...props} actions={<ListActions />} filters={<SearchFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="email" />
      <TextField source="countryCode" />
      <TextField source="phone" />
      <TextField source="phoneVerified" />
      <TextField source="emailVerified" />
      <EditButton />
    </Datagrid>
  </List>
);

export const StudentCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" />
      <TextInput source="countryCode" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
);

export const StudentEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="firstName" validate={required()} />
      <TextInput source="lastName" validate={required()} />
      <TextInput source="email" validate={required()} />
      <TextInput source="countryCode" validate={required()} />
      <TextInput source="phone" validate={required()} />
      <TextInput source="phoneVerified" validate={required()} />
      <TextInput source="emailVerified" validate={required()} />
    </SimpleForm>
  </Edit>
);

export const StudentShow = (props) => (
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
