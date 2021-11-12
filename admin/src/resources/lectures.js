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

export const LectureList = (props) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="price" />
      <TextField source="courseId" />
      <TextField source="sectionId" />
      <TextField source="order" />
      <TextField source="videoUrl" />
      <EditButton />
    </Datagrid>
  </List>
);

export const LectureCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="courseId" validate={required()} />
      <TextInput source="sectionId" validate={required()} />
      <TextInput source="title" validate={required()} />
      <TextInput source="order" validate={required()} />
      <TextInput source="price" validate={required()} />
      <TextInput source="videoUrl" />
    </SimpleForm>
  </Create>
);

export const LectureEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="courseId" validate={required()} />
      <TextInput source="sectionId" validate={required()} />
      <TextInput source="title" validate={required()} />
      <TextInput source="order" validate={required()} />
      <TextInput source="price" validate={required()} />
      <TextInput source="videoUrl" />
    </SimpleForm>
  </Edit>
);
