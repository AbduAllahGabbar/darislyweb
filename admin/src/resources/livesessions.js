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

export const LiveSessionList = (props) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="meetingUrl" />
      <TextField source="meetingId" />
      <TextField source="meetingPassword" />
      <TextField source="date" />
      <TextField source="from" />
      <TextField source="to" />
      <ReferenceField
        source="courseGroupSessionId"
        reference="coursegroupsessions"
      >
        <TextField source="id" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export const LiveSessionCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="meetingUrl" validate={required()} />
      <DateInput source="date" validate={required()} />
      <TextInput source="from" validate={required()} />
      <TextInput source="to" validate={required()} />
      <TextInput source="courseGroupSessionId" validate={required()} />
    </SimpleForm>
  </Create>
);

export const LiveSessionEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="meetingUrl" validate={required()} />
      <DateInput source="date" validate={required()} />
      <TextInput source="from" validate={required()} />
      <TextInput source="to" validate={required()} />
      <TextInput source="courseGroupSessionId" validate={required()} />
    </SimpleForm>
  </Edit>
);
