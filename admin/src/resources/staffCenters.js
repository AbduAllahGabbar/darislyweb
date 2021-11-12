import * as React from "react";
import { cloneElement } from "react";
import {
  Create,
  CreateButton,
  Datagrid,
  Edit,
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
    data,
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

export const StaffCenterList = (props) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid key={`${props.staffId}-${props.centerId}`}>
      <TextField source="staffId" />
      <TextField source="centerId" />
    </Datagrid>
  </List>
);

export const StaffCenterCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="staffId" validate={required()} />
      <TextInput source="centerId" validate={required()} />
    </SimpleForm>
  </Create>
);

export const StaffCenterEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="staffId" validate={required()} />
      <TextInput source="centerId" validate={required()} />
    </SimpleForm>
  </Edit>
);
