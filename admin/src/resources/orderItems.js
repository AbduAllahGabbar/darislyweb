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

export const OrderItemList = (props) => (
  <List {...props} actions={<ListActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="orderId" />
      <TextField source="courseGroupSessionId" />
      <TextField source="price" />
      <EditButton />
    </Datagrid>
  </List>
);

export const OrderItemCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="orderId" validate={required()} />
      <TextInput source="courseGroupSessionId" validate={required()} />
      <TextInput source="price" validate={required()} />
    </SimpleForm>
  </Create>
);

export const OrderItemEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="orderId" validate={required()} />
      <TextInput source="courseGroupSessionId" validate={required()} />
      <TextInput source="price" validate={required()} />
    </SimpleForm>
  </Edit>
);
