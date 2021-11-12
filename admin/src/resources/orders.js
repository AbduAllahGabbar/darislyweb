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
  ReferenceField,
  ReferenceManyField,
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

const OrderTotal = (props) => (
  <div>
    {props.data
      ? Object.values(props.data).reduce((sum, item) => sum + item.price, 0)
      : 0}
  </div>
);

const SearchFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Student id" source="studentId" />
    <TextInput label="Order Number" source="token" />
    <TextInput label="Fawry Ref Number" source="fawryReferenceNumber" />
  </Filter>
);

export const OrderList = (props) => (
  <List {...props} actions={<ListActions />} filters={<SearchFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="Order Number" source="token" />
      <TextField label="Fawry Ref Number" source="fawryReferenceNumber" />
      <TextField label="Student Id" source="studentId" />
      <ReferenceField
        label="Email"
        source="studentId"
        reference="students"
        sortBy="title"
      >
        <TextField source="email" />
      </ReferenceField>

      <ReferenceField
        label="Country Code"
        source="studentId"
        reference="students"
        sortBy="title"
      >
        <TextField source="countryCode" />
      </ReferenceField>

      <ReferenceField
        label="Phone"
        source="studentId"
        reference="students"
        sortBy="title"
      >
        <TextField source="phone" />
      </ReferenceField>

      <ReferenceManyField label="Total" reference="orderitems" target="orderId">
        <OrderTotal />
      </ReferenceManyField>
      <TextField source="status" />
      <TextField source="type" />
      <TextField label="Expires in (Days)" source="expiresIn" />

      <ReferenceField
        label="Center"
        source="centerId"
        reference="centers"
        sortBy="title"
      >
        <TextField source="name" />
      </ReferenceField>

      <EditButton />
    </Datagrid>
  </List>
);

export const OrderCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="studentId" validate={required()} />
      <TextInput source="status" />
      <TextInput source="type" />
      <TextInput label="Expires in (Days)" source="expiresIn" />
      <TextInput label="Center Id" source="centerId" />
    </SimpleForm>
  </Create>
);

export const OrderEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="studentId" validate={required()} />
      <TextInput source="status" />
      <TextInput source="type" />
      <TextInput label="Expires in (Days)" source="expiresIn" />
      <TextInput label="Center Id" source="centerId" />
    </SimpleForm>
  </Edit>
);
