# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- #219: Add field select layout for sign report - [@Duc]

## [1.2.82] - 2024-03-20

### Added

- Add shift work interface in the admin feature - [@Van]
- Update Nondicom: Paste image to view main - [@Hoang]

### Fixed

- Fix column reporter, operator not display - [@Duc]
- Fix merge order study search - [@Hoang]

## [1.2.81] - 2024-03-14

### Fixed

- Fix the enabled checkbox of the admin application page - [@Van]

### Changed

- Add operatorIDs to payload approvalConflict - [@Duc]
- Auto-fill consumables quantities based on designated service - [@Van]
- Updated display patient age on orderlist - [@Hoang]

## [1.2.80] - 2024-03-01

### Added

- Added feature config data for request form - [@Duc]
- Add a 'consumable materials' field for the photography service in the features admin procedure - [@Van]

### Changed

- Updated filter merge study feature - [@Hoang]
- Not clear examinationDefaultConfig when logout - [@Duc]

## [1.2.79] - 2024-02-22

### Changed

- #185: Display current time if finalApprovedTime null - [@Duc]
- #183: fix timetable form - [@Duc]
- #194: BS không trong ca làm việc vẫn được duyệt Chỉ định không phải BHYT - [@Duc]
- #172: Update HIS report status - [@Duc]
- Thêm nút đóng mở phần thông tin bên trái màn Viết KQ

## [1.2.78] - 2024-02-01

### Changed

- #106: Display procedureName + BHYT if order is insurance applied- [@Duc]
- #117: Add column approver, operator for order table - [@Duc]
- #122: Tính năng kết quả xét nghiệm - [@Duc]
- #127: Hiển thị định mức bảo hiểm máy chụp, màn thông tin chỉ định - [@Duc]

## [1.2.77] - 2024-01-24

### Added

- PVD-747: Add API transfer study - [@Duc]

## [1.2.76] - 2024-01-12

### Added

- PVD-715: Add API general setting - [@Duc]
- PVD-716: Add API shortcut key setting - [@Duc]
- PVD-716: Add popup setting order table - [@Duc]
- PVD-713: Add description editor - [@Duc]

## [1.2.75] - 2024-01-08

### Fixed

- PVD-707: replace some select field to autocomplete field - [@Duc]

## [1.2.74] - 2024-01-05

### Added

- PVD-633 : Add feature transfer dicom image - [@Duc]
- PVD-693 : Add feature user config - [@Duc]
- PVD-696: Add feature config shortcut - [@Duc]
- PVD-592: Added style for extrasmall input (Select, Autocomplete, Datepicker, Checkbox) - [@Duc]

### Fixed

- Fixed auto fill operationTime logic with dicomo or non-dicom order - [@Duc]
- Fixed logic set operation time when double click to lock order - [@Duc]

### Changed

- Changed max tab from 10 -> 4 - [@Duc]

## [1.2.73] - 2023-12-28

### Fixed

- Hot fix check time before call API check insurance - [@Duc]

## [1.2.72] - 2023-12-27

### Fixed

- Fixed init operationTime from useRadiologyReport - [@Duc]
- Fixed table summary modality not display insurance number - [@Duc]
- Fixed modality select field in request form display capability - [@Duc]

## [1.2.71] - 2023-12-26

### Changed

- PVD-668 : Date time no display seconds - [@Duc]
- PVD-593 : Padding of icon button is 6 - [@Duc]

## [1.2.7] - 2023-12-25

### Changed

- PVD-667 : Refactor logic check conflict approval- [@Duc]

## [1.2.6] - 2023-12-25

### Changed

- PVD-662 : Change some condition for write radilogy report page - [@Duc]

## [1.2.5] - 2023-12-24

### Changed

- PVD-644 : Define endpoints for analytics - [@Duc]
- PVD-658 : Feature statistic report - [@Duc]
- Do not check the modality capability - [@Duc]

## [1.2.4] - 2023-12-20

### Added

- Added API countRequestsByModality - [@Duc]
- Added logic check modality capability when approve - [@Duc]
- PVD-649: Added feature medical history - [@Duc]
- Update dynamic info - [@Hoang]
- Update content display trees request dynamic side bar - [@Hoang]
- PVD-648: Button copy report content to main editor - [@Duc]
- PVD-652: Highlight report dynamic side bar - [@Hoang]
- PVD-656: Added icon HIS report status - [@Duc]
- Add column expectedReporter order table - [@Hoang]

## [1.2.3] - 2023-12-12

### Fixed

- Fixed bug change tab is to delete current content - [@Duc]
- Fixed bug change tab is delete selected operators - [@Duc]

### Added

- Logic required operator when approve - [@Duc]

## [1.2.2] - 2023-12-09

### Fixed

- Hot fix some logic check time when submit request form - [@Duc]

### Changed

- Change format display date time - [@Hoang]

## [1.2.1] - 2023-12-08

### Changed

- PVD-641: Double click open modal order infomation in Examination module - [@Duc]
- PVD-642: Auto pick procedure when open modal order infomation - [@Duc]
- PVD-627: Logic get warning before approve - [@Duc]
- PVD-636: Change color order table row - [@Duc]

## [1.2.0] - 2023-12-04

### Changed

- Add option sort by studyTime for order table - [@Duc]

### Fixed

- Fix table filter expandable - [@Duc]

## [1.1.9] - 2023-12-04

### Changed

- Change logic get layout for order - [@Duc]

### Fixed

- Order list filter form smaller - [@Duc]

## [1.1.8] - 2023-12-01

### Fixed

- Fixed too much re-render when typing report - [@Triet]
- Fixed console error caused by duplicate keys - [@Triet]

## [1.1.7] - 2023-11-30

### Changed

- Add config for auto fill content template - [@Duc]
- Add config filter content template by current user - [@Duc]

## [1.1.6] - 2023-11-29

### Fixed

- PVD-621: Fix radiology actions button - [@Duc]
- PVD-617: Fix logic enabled button approve report, lock order - [@Duc]

### Changed

- PVD-620,PVD-619: Report content in radiology page always blank until user typing - [@Duc]

## [1.1.5] - 2023-11-28

### Fixed

- Fixed styling of context menu items - [@Triet]
- PVD-618: Print approved report file by curent selected procedure - [@Duc]

### Changed

- Get signed pdf file instead of html file - [@Duc]
- PVD-598: Call api to get request data, not get requests from order - [@Duc]
- Changed storage from localStorage into IndexedDB - [@Triet]

### Added

- PVD-614: Feature accept order - [@Duc]

## [1.1.4] - 2023-11-21

### Added

- Add func generate barcode image, qrcode image - [@Duc]
- PVD-569: Add default field config for order list table - [@Triet]

### Changed

- Refactor form create/update order request - [@Duc]
- Refactor theme picker - [@Triet]

### Fixed

- Fixed operators dont match with operators in session - [@Duc]

## [1.1.3] - 2023-11-16

### Change

- Add gender paramaters when sign report - [@Duc]

### Fixed

- Fixed change request in radiology page - [@Duc]

## [1.1.2] - 2023-11-15

### Change

- Table consumables active with modalityType dicom - [@Duc]
- Add images when sign report - [@Duc]

## [1.1.1] - 2023-11-15

### Change

- Imaging doctor double click order get shift - [@Hoang]

## [1.1.0] - 2023-11-14

### Added

- Add inpatient column order table - [@Hoang]
- Add consumables column order table - [@Hoang]

### Fixed

- Hot some bug in radiology report page - [@Duc]

## [1.0.9] - 2023-11-13

### Added

- Add session config for reading radiology - [@Duc]
- Add expected reporter select field - [@Duc]
- Add nonDicom extension panel - [@Duc]
- Select images for save,approve report - [@Duc]

### Change

- PVD-548: Remove slow print , add flow of report print preview - [@Duc]
- PVD-543: Update radiology action buttons - [@Duc]
- PVD-544: Sign a radiology report - [@Duc]
- PVD-545, PVD-546 : Change save ,approve flow and add button cancel approved report- [@Duc]
- PVD-558: Use API moduleExtension to get extension with module - [@Duc]

## [1.0.8] - 2023-10-25

### Fixed

- PVD-537: Fix display Signed Icon - [@Duc]

## [1.0.7] - 2023-10-16

### Fixed

- PVD-522: Fix button NavBarVideoConferencingButton - [@Duc]
- PVD-518: Fix operation time - [@Duc]

## [1.0.6] - 2023-10-11

### Added

- PVD-516: Add VISNAM assets - [@Duc]
- PVD-507: Add content template module by user - [@Duc]
- PVD-496: feature medical equipment to dynamic side - [@Duc]
- PVD-503: Enable feature compare study in the right-click menu - [@Duc]

### Change

- PVD-497: Cannot lock order if level of current user === approved user - [@Duc]
- PVD-502: add config open viewer - [@Duc]

## [1.0.5] - 2023-10-01

### Change

- PVD-495: Change logic when click combine approve button - [@Duc]

### Fixed

- PVD-487: Field pick operators when create / update order request - [@Duc]

### Added

- PVD-492: feature medical equipment for request - [@Duc]
- PVD-449: Update theme app - [@Hoang]

## [1.0.4] - 2023-09-23

### Fixed

- field pick operators for radiology report - [@Duc]

## [1.0.3] - 2023-09-22

### Added

- PVD-474: Add feature attachment file for mobile - [@Duc]
- PVD-481: Enabled multi select row in attachment table, add button delete multi file - [@Duc]

### Fixed

- PVD-469: Fix procedure group dto- [@Duc]
- PVD-470: Add enabled field to form create/update user - [@Duc]
- PVD-468: Change modalityType DTO - [@Duc]
- PVD-477: Bug close radiology panel after apporve order report - [@Duc]
- PVD-485: Requests in order must same modalityType - [@Duc]

## [1.0.2] - 2023-09-12

### Added

- PVD-450: Change color theme VIETRAD - [@Hoang]
- PVD-465: Deny approve report if current user not in shift - [@Duc]

### Fixed

- Always getOne to get timetable data when open popup update - [@Duc]

## [1.0.1] - 2023-09-08

### Added

- PVD-459: Add timetable module - [@Duc]

### Fixed

- Allow edit operationDate, expectedDate for request from HIS - [@Duc]

## [1.0.0] - 2023-08-31

### Added

- PVD-457: Add button collapse all panel - [@Duc]
- Add YHCT Nghe An hospital assets - [@Duc]
- Initialize expectedReportTime,operationTime in useRadiologyReport - [@Duc]

## [0.9.9] - 2023-08-29

### Change

- PVD-447: Change some field in panel radiology - [@Duc]
- PVD-435: Update theme app - [@Hoang]
- PVD-434: Update form create order - [@Duc]
- PVD-431: Simplify logic get layout template - [@Duc]
- PVD-453: Change color header title side bar - [@Hoang]

### Added

- PVD-396: Add feature dynamic side panel from server config - [@Triet]
- PVD-448: Update x-date-pickers version 6.11.2 - [@Duc]

### Fixed

- PVD-400: Fix style signature status button - [@Duc]
- PVD-403: Display final report in editor when open radiology page - [@Duc]

- PVD-430: Update layout form - [@Duc]
- PVD-424: Update content form - [@Duc]
- PVD-423: Update modality form - [@Duc]
- PVD-422: Update user management form - [@Duc]
- PVD-417: Update user group form - [@Duc]
- PVD-418: Udate Navbar by new group,module DTO - [@Duc]

## [0.9.8] - 2023-08-07

### Change

- PVD-330: Dynamic hospitalID by url hostname for itech query - [@Duc]
- PVD-351: Dynamic hospial Logo by url hostname - [@Duc]

### Added

- Add Binh Dinh hospital assets - [@Duc]
- PVD-398: Add feature userType admin - [@Duc]
- PVD-393: Add feature application admin - [@Duc]
- PVD-370: Add feature PACS config admin - [@Duc]
- PVD-323: Add feature event log admin - [@Duc]
- PVD-341: Add feature role admin - [@Hoang]
- PVD-346: Add feature modality type name admin - [@Hoang]
- PVD-335: Add 'STT' column for all table admin manager - [@Hoang]

## [0.9.7] - 2023-07-21

### Added

- PVD-268: Add some new admin route - [@Duc]
- PVD-242: Add statistical report - [@Hoang]
- PVD-252: Add mobile date picker field approve - [@Duc]
- PVD-179: Add Download DICOM image - [@Hoang]
- PVD-229: Add MyCustomFormSelectField - [@Duc]
- PS-420: Add Kiosk page for dkqthp - [@Hoang]
- PVD-255: Update display icon bookmark when bookmarked or not bookmarked - [@Hoang]
- PVD-256: Add icon quick report in order list side panel - [@Duc]
- PVD-269: Add quick radiology report panel in order list - [@Duc]
- PVD-295: Add feature admin user activity - [@Duc]
- PVD-267: Add module SUMMARY - [@Duc]
- PVD-323: Add feature event log admin - [@Duc]

### Change

- PVD-230: Display text field when date time picker disabled - [@Duc]
- PVD-258: Remove menu delete lock in combine button - [@Duc]
- PVD-270: Update video conference (join token to link) - [@Hoang]
- PVD-301: Update group 'Quản lý người dùng'(Người dùng, Khoa phòng, Chữ ký số) in admin page - [@Hoang]
- PVD-303: Update group 'Quản lý chẩn đoán'(Dịch vụ chụp, Mẫu chẩn đoán, Nhóm mẫu chẩn đoán, Mẫu in kết quả) in admin page - [@Hoang]
- PVD-302: Update group 'Quản lý máy chụp'(Máy chụp) in admin page - [@Hoang]
- PVD-304: Use API orderStatus instead of reportStatusCount - [@Duc]
- PVD-231: Change UX/UI of request field - [@Duc]

### Fixed

- PVD-254: Fixed overflow take nondicom picture screen - [@Duc]
- PVD-259: Fixed display wrong bookmark info - [@Hoang]
- PVD-257: Delete lock when close report tab or close popup quick report - [@Duc]
- PVD-260: Refactor admin certificate - [@Duc]
- PVD-266: Refactor ReferringPhysicianDynamicEditableField,RequestDepartmentDynamicEditableField, PriorityDynamicEditableField - [@Duc]
- PVD-328: Fixed video conferencing log out room change to click button video conferencing on navbar menu will open brower new tab - [@Hoang]

## [0.9.6] - 2023-06-30

### Fixed

- PVD-251: Fix approvedTime not true when submit approve report - [@Duc]

### Change

- PVD-248: Rearrange Mobile order list columns && add column TT Đọc - [@Duc]
- PVD-249 : Mobile radiology,technician & transcriber field display by config - [@Duc]

### Added

- PVD-234: Add modal save and update bookmark - [@Hoang]
- PVD-235: Add modal create bookmark folder - [@Hoang]
- PVD-236: Add delete bookmark function(button) on modal update bookmark - [@Hoang]
- PVD-243: Add mobile order infomation page - [@Duc]
- PVD-194: Add bookmark in side panel - [@Hoang]
- PVD-244: Add mobile write radiology page - [@Duc]
- PVD-245: Add logic approve and save report - [@Duc]
- PVD-241: Add select template in radiology report page - [@Hoang]

## [0.9.5] - 2023-06-22

### Added

- PVD-232: Add right click popup in examination list - [@Duc]

### Fixed

- PVD-222: Fixed tooltip display at column 'TT Đọc' - [@Hoang]
- PVD-237: Fixed change order tab -> not update order info in dynamic side - [@Duc]

### Change

- PVD-198: Update logic display content in radiology report when order not lock - [@Duc]

## [0.9.4] - 2023-06-16

### Added

- Add popup before approve report in Dynamic side- [@Duc]
- Add label autocomplete request field create order - [@Hoang]

### Change

- Request not approved can aprrove in Dynamic side - [@Duc]
- Update cache invalidation behavior for reportStatusCount API - [@Duc]
- Label Chờ Duyệt -> Đang đọc - [@Duc]
- PVD-221: Change button label && notification in edit action - [@Duc]
- PVD-223: Logic disable some field in PatientInfoFormFields - [@Duc]
- PVD-217: Change layout select request quick radiology report - [@Hoang]

### Fixed

- Fixed validate require input before add new request - [@Hoang]
- Fixed popup create order overflow - [@Hoang]
- Fixed filter list modality field follow modality type of request - [@Hoang]
- Fixed close modal edit when success update request create order - [@Hoang]
- Fixed cant close list request (autocomplete request field) create order - [@Hoang]
- Fixed display item request list follow mockup create order - [@Hoang]
- Fixed overflow in add request modal create order - [@Hoang]
- PVD-216: Select an order -> Active request at Side panel when 'Đọc ca' this order input 'Chỉ định' will change value activated
- PVD-227 : Fix the order creation process - [@Duc]
- PVD-226: Fixed doesn't exist modality type still load list request - [@Hoang]

## [0.9.3] - 2023-06-12

### Fixed

- Dynamic select request field in quick report page - [@Hoang]
- Add conditions to get state of button Save draft,Approve - [@Duc]

### Change

- Remove 'Duyệt lại' button label - [@Duc]
- Change icon split screen - [@Hoang]
- Change logo Hong Hung,Phuoc Dong hospital - [@Duc]

## [0.9.2] - 2023-06-10

### Added

- Add request autocomplete field create order - [@Hoang]
- Button approve report in dynamic side - [@Duc]
- Add column report status to Order/Examination list- [@Duc]

### Fixed

- Fix update display report status (final, approved, save) in orderinformation - [@Hoang]
- Fixed layout create order - [@Hoang]
- Rework conditons right click menu order list - [@Hoang]
- Quick fix condition for icon display in OrderTableInfoColumn - [@Duc]

### Change

- API get list order default sort by reportStatus(asc), requestedTime(desc) - [@Duc]
- Set empty editor when request clicked not exist finalReportID - [@Duc]
- Change order of fields in order table && examination table - [@Duc]

## [0.9.1] - 2023-06-02

### Changed

- Change icon merge study,icon split study [@Duc]

### Fixed

- Fix text overflow in bottom fields (Thông tin chỉ định,CĐLS) - [@Duc]
- Fix layout merge study modal - [@Duc]

### Added

- Add feature split order - [@Duc]

## [0.9.0] - 2023-05-29

### Changed

- Update x-date-pickers to 0.6.5 && refactor MyFormDateTimePicker- [@Duc]
- Update modalityID for request when approve report,not call API update request when change modalityID - [@Duc]
- Change layout radiology report, add some field in bottom - [@Duc]
- Remove menu approve with select date in CombinedApproveButton- [@Duc]
- Disabled input in radiology report when not lock order - [@Duc]

### Fixed

- Fixed style date picker after update version MUI & style layout input field Study info - [@Hoang]
- Fix when select content in radiology report can't update value content select field - [@Hoang]
- Fix style write radiology bottom field,add title tooltip when field ellipsis - [@Duc]
- Fix display date time format from MM/DD/YYYY to DD/MM/YYYY - [@Duc]

### Added

- Add personal content template action in radiology report - [@Hoang]
- Add button delete study in StudyInfo side panel - [@Duc]

## [0.8.0] - 2023-05-22

### Added

- Add feature create order in examination page - [@Hoang]
- Add when click a row in history table update sidepanel info and sort the nearest study date - [@Hoang]
- Add video conference in all sidebar - [@Hoang]
- Add Download attachment file button in right click menu(Attachment in sidebar) - [@Hoang]
- Add sidebar in slow radiology report - [@Hoang]
- Add attachment in side bar new layout - [@Hoang]
- Add when click request & report in information order side bar will change result in diagnostic result - [@Hoang]
- Add component report status count in sidebar orderList - [@Duc]
- Add component requestedDate picker in sidebar orderList - [@Duc]
- Dev only : add MultiCheckboxController - [@Duc]
- Add dynamic side panel for page: Order List, Order Result - [@Triet]
- Add resizeable dynamic side panel items - [@Triet]
- Add component to compact pagination when table width too small - [@Duc]
- Add module examination - [@Duc]

### Changed

- Change header layout radiology report - [@Hoang]
- All API will now have cache invalidation time of 10 seconds - [@Triet]
- Removed Order Panel, Order Result Panel - [@Triet]
- Change layout order information in order panel - [@Hoang]
- Add dynamic main button for report writing flow - [@Triet]
- Add dark theme to app - [@Hoang]
- Rework logic in main flow: lock, delete lock, approve, save draft - [@Triet]
- Update border styles of Tabs to be more similar to mockup - [@Triet]
- Change condition display non study icon - [@Duc]
- Changed reposition component in sidebar panel - [@Hoang]

### Fixed

- Fix overflow layout content select in radiology report - [@Hoang]
- Fix bullet lists not deletable - [@Triet]
- Fix drag handler styles, title and icon for sidepanels - [@Triet]
- Dev only: Fix Button slow print only depend on Radiology Report Page - [@Triet]
- Fix display duplicate item in Navbar menu modules - [@Duc]
- Sync advance filter with sidebar requested date - [@Duc]
- Fixed size when rezise information in side panel - [@Hoang]
- Remove label at editor readonly report side panel - [@Hoang]
- Styled order info layout when resize side bar - [@Hoang]
- Fixed drag handler not releasing mouse correctly when there are i-frames on the screen - [@Triet]
- Fixed MyFormDateRangePicker to set date default value - [@Duc]
- Fixed initial query for examination table && fix examination side icon - [@Duc]

## [0.7.0] - 2023-04-25

### Added

- Add single button Open,Quick Lock to Order table && add Delete lock menu to right click - [@Duc]
- Side bar order list collapse show icon button - [@Hoang]

### Change

- Enable feature print dicom images in OrderList - [@Duc,Hoang]
- Redirect to default module by user type when login success - [@Duc]
- In order list,Button open order instead button open & lock order - [@Duc]
- Resize quick report modal - [@Hoang]

### Fixed

- Fixed show notify when click 'In nhanh' button but has no file PDF - [@Hoang]

## [0.6.7] - 2023-04-23

### Fixed

- Fixed Slow print popup cannot close when user opens to print only - [@Triet]
- Fixed duplicate API call in order table panel - [@Triet]
- Fixed Quick report button in right click menu does not check the same permission as Lock order button - [@Triet]

### Change

- Disabled action buttons 'Chuyển ca', 'Chức năng khác', 'Cấu hình bảng' in order list - [@Hoang]

## [0.6.6] - 2023-04-21

### Added

- Add sign status show/hide dependent config hospital in order panel - [@Hoang]
- Add button slow print to panel - [@Hoang]

### Change

- Change label of actions button && keybinds for button feature - [@Duc]
- Add request order status in order panel - [@Hoang]

### Fixed

- Fixed unecessary API dicomImage calls in slow print pop up - [@Triet]
- Fixed login block styles - [@Duc]

## [0.6.5] - 2023-04-19

### Added

- Add column requestedDepartment to OrderTable - [@Duc]
- Add view image button in order panel - [@Hoang]
- Add filter by requestedDate for OrderTable mobile - [@Duc]
- Add logic display icon in status column by hospital config - [@Duc]

### Fixed

- Fixed bug logo in login block with small screen - [@Duc]
- Add add fields to report sidebar info - [@Duc]
- Dev only : Fixed MyFormDateTimePicker suitable for all type (date,dateTime,time) - [@Duc]
- Fixed patient name in radiology sidebar - [@Duc]

### Changed

- Change style tab item - [@Hoang]
- Display list report with finalReport approve alway on top of list - [@Duc]
- Display modality_group_name instead modality_group_code in sidebar OrderList- [@Duc]
- Local settings now cleared on logout - [@Triet]
- After a new day has passed, the table queries will be reset - [@Triet]
- Automatically log out on application crash - [@Triet]
- label "Tệp đính kèm" -> "Tài liệu đính kèm" - [@Duc]

## [0.6.4] - 2023-04-16

### Added

- Add sign report after approved in radiology report - [@Hoang]
- Add feature mobile order list - [@Duc]

### Changed

- Changed logic quick & slow print get report pdf - [@Hoang]
- isplay list report with finalReport approve alway on top of list - [@Duc]

### Fixed

- Fixed filter form value to reset - [@Duc]
- Add add fields to report sidebar info- [@Duc]

## [0.6.3] - 2023-04-12

### Added

- Auto fetch list summary after 30s (for QMS) - [@Duc]

### Changed

### Fixed

- Fixed not display ticket list filter (for QMS) - [@Duc]

## [0.6.2] - 2023-04-12

### Added

- Add feature compare study - [@Hoang]
- Add mobile routes - [@Duc]
- Add notify when data procedures null (for QMS) - [@Duc]

## [0.6.1] - 2023-04-08

### Fixed

- Fix change password block not responsive - [@Duc]

## [0.6.0] - 2023-04-07

- Add feature changes password - [@Duc]
- Add feature print dicom images - [@Duc]
- Add Ngoai Than Kinh hospital assets - [@Duc]
- Add column 'Bộ phận chụp' in result table - [@Duc]

### Changed

- Changed logoWithName from _ntk logo_ to _ntk with logo collab itech logo_ - [@Hoang]
- Change checkbox to radio button column table - [@Hoang]
- Change title 'BS đọc' -> 'Bác sĩ đọc' in result table - [@Duc]
- Time refresh result list is 60s - [@Duc]

### Fixed

- Fixed 'Bác sĩ đọc' field in order list can't show name - [@Hoang]
- Fixed 'Bác sĩ đọc' field in result list can't show name - [@Duc]

## [0.5.0] - 2023-04-03

### Changed

- Hidden button ConsultantMeeting, Theme and permission ViewStatistic on navbar - [@Hoang]
- Date Range Picker will now only updates form value when both start date and end date have been specified - [@Triet]

### Fixed

- Fixed automatic page redirect with origin url - [@Duc]
- Fixed style when active, hover on row order list - [@Hoang]
- Fixed style menu navbar order list - [@Hoang]
- Fixed style width attachment table - [@Hoang]
- Fixed close form search when user execute searching - [@Hoang]

## [0.4.2] - 2023-03-31

### Added

- Add column 'Bộ phận' to order list - [@Hoang]

### Fixed

- Fixed style Attachment modal - [@Hoang]
- Fixed dropdown date range losing position when select date - [@Hoang]
- Fixed select/dropdown popup losing position when order table refreshes - [@Triet]
- Enhance performance of drag handler in resizing panel - [@Triet]

### Changed

- Changed double click order list, icon sidebar order list, combine report result report order list, column study history - [@Hoang]
- Changed select input to autocomplete input on input search order list - [@Hoang]
- Update patient id for title order panel - [@Hoang]

### Added

- Add hook to get user permissions - [@Duc]
- Add feature view diagnostic results - [@Duc]

## [0.4.0] - 2022-02-02

### Added

- Add new layout order study info panel - [@Hoang]
- Add layout table order - [@Hoang]
- Add feature ticket QMS - [@Hoang]
- Add new table action buttons - [@Hoang]
- Add feature admin content - [@Hoang]
- Add field name into modality group - [@Hoang]
- Add feature admin Content Group - [@Hoang]
- Add icon tree menu, fix style, persist state tree menu - [@Hoang]
- Added Modality Admin page - [@Triet]
- Add support for JSON type validation in Certificate page - [@Triet]
- Add Order list base UI - [@Triet]
- Add Resizeable Collapsible Panel feature - [@Triet]
- Add Right Click Context Menu feature - [@Triet]
- Add Stack Trace to Error Fallback component - [@Triet]

### Changed

- Change DTO certificate - [@Hoang]
- Change rework all table admin screen - [@Hoang]
- Change rework table admin department - [@Hoang]
- Change label modality type, refactor Autocomplete & style css - [@Hoang]
- Change plugin source code Editor - [@Hoang]
- Change style table to new style table pagination - [@Hoang]
- Refactor code and check validate - [@Hoang]
- Style table & refactor some component - [@Hoang]
- Get one query when show edit modules - [@Hoang]
- Check validate modality room & modality group - [@Hoang]
- Change logic check validate when edit modality group - [@Hoang]
- Simplify table layout and add support for table pagination - [@Triet]
- Update modality list filter to use dropdown for RoomID and GroupID - [@Triet]
- Enhance UX for collapsible panels - [@Triet]

## [0.3.0] - 2022-10-24

### Changed

- Lift AdminFooter component to ModalFooterLayout component - [@Hoang]
- Update admin modality room to new flow - [@Hoang]
- Changed API to new v4 backend and updated User and Token DTO - [@Triet]
- Changed login flow to match new API - [@Triet]

### Added

- Add feature admin procedure group - [@Hoang]
- Add feature admin procedure - [@Hoang]
- Add feature admin modality type - [@Duc]
- Add feature admin modality group - [@Hoang]
- Add feature admin modality room - [@Hoang]
- Add tooltip in app - [@Hoang]
- Add logic Toggle Theme App - [@Hoang]
- Add custom component MUI (Toggle Button,Alert,Dialog,Progress,Snackbar,Accordion) - [@Duc]
- Add Modal and Snackbar notification system - [@Triet]
- Custom component MUI (ButtonGroup, Checkbox , RadioGroup , Select , Switch) - [@Phuoc]
- Add icon to use in app - [@Phuoc]
- Add table pagination support - [@Triet]
- Add left click, right click, double click support for table - [@Triet]
- Add expandable form implementation - [@Triet]
- Add feature admin Certificate authority - [@Duc]
- Add mutex guard when performing multiple refresh_token action at the same time - [@Triet]

## [0.2.0] - 2022-09-21

### Added

- Add form group component - [@Triet]

### Changed

- Change generic coding style - [@Phong]

## [0.1.0] - 2022-09-20

### Added

- Initial release - [@Triet]
