import simpleRestProvider from "ra-data-simple-rest";
import React from "react";
import { Admin, fetchUtils, Resource } from "react-admin";
import "./App.css";
import authProvider from "./auth/authProvider";
import { API_URL } from "./constants";
import {
  AdminCreate,
  AdminEdit,
  AdminList,
  AnnouncementCreate,
  AnnouncementList,
  AreaCreate,
  AreaEdit,
  AreaList,
  CenterCreate,
  CenterEdit,
  CenterList,
  CityCreate,
  CityEdit,
  CityList,
  CourseCreate,
  CourseEdit,
  CourseGroupCreate,
  CourseGroupEdit,
  CourseGroupList,
  CourseGroupSessionCreate,
  CourseGroupSessionEdit,
  CourseGroupSessionList,
  CourseList,
  LectureCreate,
  LectureEdit,
  LectureList,
  LiveSessionCreate,
  LiveSessionEdit,
  LiveSessionList,
  OrderCreate,
  OrderEdit,
  OrderItemCreate,
  OrderItemEdit,
  OrderItemList,
  OrderList,
  ProductCreate,
  ProductEdit,
  ProductList,
  SectionCreate,
  SectionEdit,
  SectionList,
  StaffCenterCreate,
  StaffCenterEdit,
  StaffCenterList,
  StaffCreate,
  StaffEdit,
  StaffList,
  StudentCreate,
  StudentEdit,
  StudentList,
  SubjectCreate,
  SubjectEdit,
  SubjectList,
  TutorCreate,
  TutorEdit,
  TutorList,
} from "./resources";

const httpClient = (url, options = {}) => {
  options.credentials = "include";
  return fetchUtils.fetchJson(url, options);
};

const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={simpleRestProvider(`${API_URL}/admin`, httpClient)}
    >
      <Resource
        name="admins"
        list={AdminList}
        create={AdminCreate}
        edit={AdminEdit}
      />

      <Resource
        name="students"
        list={StudentList}
        create={StudentCreate}
        edit={StudentEdit}
      />

      <Resource
        name="tutors"
        list={TutorList}
        create={TutorCreate}
        edit={TutorEdit}
      />

      <Resource
        name="staffs"
        list={StaffList}
        create={StaffCreate}
        edit={StaffEdit}
      />

      <Resource
        name="subjects"
        list={SubjectList}
        create={SubjectCreate}
        edit={SubjectEdit}
      />

      <Resource
        name="cities"
        list={CityList}
        create={CityCreate}
        edit={CityEdit}
      />

      <Resource
        name="areas"
        list={AreaList}
        create={AreaCreate}
        edit={AreaEdit}
      />

      <Resource
        name="centers"
        list={CenterList}
        create={CenterCreate}
        edit={CenterEdit}
      />

      <Resource
        name="staffcenters"
        list={StaffCenterList}
        create={StaffCenterCreate}
        edit={StaffCenterEdit}
      />

      <Resource
        name="orders"
        list={OrderList}
        create={OrderCreate}
        edit={OrderEdit}
      />

      <Resource
        name="orderitems"
        list={OrderItemList}
        create={OrderItemCreate}
        edit={OrderItemEdit}
      />

      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
      />

      <Resource
        name="coursegroups"
        list={CourseGroupList}
        create={CourseGroupCreate}
        edit={CourseGroupEdit}
      />

      <Resource
        name="coursegroupsessions"
        list={CourseGroupSessionList}
        create={CourseGroupSessionCreate}
        edit={CourseGroupSessionEdit}
      />

      <Resource
        name="sections"
        list={SectionList}
        create={SectionCreate}
        edit={SectionEdit}
      />

      <Resource
        name="lectures"
        list={LectureList}
        create={LectureCreate}
        edit={LectureEdit}
      />

      <Resource
        name="livesessions"
        list={LiveSessionList}
        create={LiveSessionCreate}
        edit={LiveSessionEdit}
      />

      <Resource
        name="announcements"
        list={AnnouncementList}
        create={AnnouncementCreate}
      />

      <Resource
        name="products"
        list={ProductList}
        create={ProductCreate}
        edit={ProductEdit}
      />
    </Admin>
  );
};

export default App;
