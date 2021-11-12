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

export const AnnouncementList = (props) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="courseId" />
      <TextField source="title" />
      <TextField source="content" />
      <TextField source="createdAt" />
      <EditButton />
    </Datagrid>
  </List>
);

export const AnnouncementCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="courseId" validate={required()} />
      <TextInput source="title" validate={required()} />
      <TextInput source="content" validate={required()} />
    </SimpleForm>
  </Create>
);
