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

export const CourseList = (props) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />

      <ReferenceField label="First Name" source="tutorId" reference="tutors">
        <TextField source="firstName" />
      </ReferenceField>

      <ReferenceField label="Last Name" source="tutorId" reference="tutors">
        <TextField source="lastName" />
      </ReferenceField>

      <ReferenceField label="Subject" source="subjectId" reference="subjects">
        <TextField source="name" />
      </ReferenceField>

      <TextField source="education" />
      <TextField source="grade" />
      <TextField source="videoUrl" />
      <EditButton />
    </Datagrid>
  </List>
);

export const CourseCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="subjectId" validate={required()} />
      <TextInput source="tutorId" validate={required()} />
      <TextInput source="education" validate={required()} />
      <TextInput source="grade" validate={required()} />
      <TextInput source="description" validate={required()} />
      <TextInput source="videoUrl" />
    </SimpleForm>
  </Create>
);

export const CourseEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="subjectId" validate={required()} />
      <TextInput source="tutorId" validate={required()} />
      <TextInput source="education" validate={required()} />
      <TextInput source="grade" validate={required()} />
      <TextInput source="description" validate={required()} />
      <TextInput source="videoUrl" />
    </SimpleForm>
  </Edit>
);
