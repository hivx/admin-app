import { Typography, styled } from '@mui/material';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  ItechFolderIcon,
  ItechStorageIcon,
  ModalityRoomIcon,
  ViewImageIcon,
} from '@/assets/icon';
import { IRenderTree, MyTreeView } from '@/components';
import { useTranslate, useAppSelector, useAppDispatch } from '@/hooks';
import {
  getItemMenuExpanded,
  setItemAdminMenuExpanded,
} from '@/stores/sideBar/menuSlice';

import { UserSettingIcon, DiagnosisIcon, SettingIcon, DiaryIcon } from '../assets/icons';
import { useMatchItemsByPathname } from '../hooks/useMatchItemsByPathname';
import {
  ROUTE_ADMIN_DEPARTMENT,
  ROUTE_ADMIN_CERTIFICATE,
  ROUTE_ADMIN_MODALITYROOM,
  ROUTE_ADMIN_MODALITY,
  ROUTE_ADMIN_MODALITYTYPE,
  ROUTE_ADMIN_MODALITYGROUP,
  ROUTE_ADMIN_PROCEDURE_GROUP,
  ROUTE_ADMIN_PROCEDURE,
  ROUTE_ADMIN_CONTENT_GROUP,
  ROUTE_ADMIN_CONTENT,
  ROUTE_ADMIN_LAYOUT,
  ROUTE_ADMIN_USER_GROUP,
  ROUTE_ADMIN_USER,
  ROUTE_ADMIN_DISPLAY_CONFIG,
  ROUTE_ADMIN_MODALITY_TYPE_NAME,
  ROUTE_ADMIN_PATIENT,
  ROUTE_ADMIN_USER_ROLE,
  ROUTE_ADMIN_USER_TYPE,
  ROUTE_ADMIN_APPLICATION,
  ROUTE_ADMIN_CONFIG,
  ROUTE_ADMIN_EVENT_LOG,
  ROUTE_ADMIN_FILE_STORE,
  ROUTE_ADMIN_ORDER,
  ROUTE_ADMIN_REMOTE_STORE,
  ROUTE_ADMIN_SHIFT_WORK,
  ROUTE_ADMIN_STATISTICS_REPORT,
  ROUTE_ADMIN_STORE,
  ROUTE_ADMIN_STUDY,
  ROUTE_ADMIN_USER_ACTIVITY,
  ROUTE_ADMIN_WORKSTATION,
} from '../routes/paths';

const NODES = {
  /**
   * TOP NODES
   */
  TOP: {
    USER_ADMIN: {
      id: 'USER_ADMIN',
      route: null,
    },
    ROOM_ADMIN: {
      id: 'ROOM_ADMIN',
      route: null,
    },
    PROCEDURE_ADMIN: {
      id: 'PROCEDURE_ADMIN',
      route: null,
    },
    ORDER_ADMIN: {
      id: 'ORDER_ADMIN',
      route: null,
    },
    STORAGE_ADMIN: {
      id: 'STORAGE_ADMIN',
      route: null,
    },
    DIANOSIS_ADMIN: {
      id: 'DIANOSIS_ADMIN',
      route: null,
    },
    SYSTEM_ADMIN: {
      id: 'SYSTEM_ADMIN',
      route: null,
    },
    HISTORY_ADMIN: {
      id: 'HISTORY_ADMIN',
      route: null,
    },
  },

  /**
   * Children nodes, has actual navigation action on user click
   */
  CHILDREN: {
    DEPARTMENTS: {
      id: 'DEPARTMENTS',
      route: ROUTE_ADMIN_DEPARTMENT,
    },
    CERTIFICATE: {
      id: 'CERTIFICATE',
      route: ROUTE_ADMIN_CERTIFICATE,
    },
    MODALITY_ROOM: {
      id: 'MODALITY_ROOM',
      route: ROUTE_ADMIN_MODALITYROOM,
    },
    MODALITIES: {
      id: 'MODALITIES',
      route: ROUTE_ADMIN_MODALITY,
    },
    MODALITY_TYPE: {
      id: 'MODALITY_TYPE',
      route: ROUTE_ADMIN_MODALITYTYPE,
    },
    MODALITY_GROUP: {
      id: 'MODALITY_GROUP',
      route: ROUTE_ADMIN_MODALITYGROUP,
    },
    PROCEDURE_GROUP: {
      id: 'PROCEDURE_GROUP',
      route: ROUTE_ADMIN_PROCEDURE_GROUP,
    },
    PROCEDURE: {
      id: 'PROCEDURE',
      route: ROUTE_ADMIN_PROCEDURE,
    },
    CONTENT_GROUP: {
      id: 'CONTENT_GROUP',
      route: ROUTE_ADMIN_CONTENT_GROUP,
    },
    CONTENT: {
      id: 'CONTENT',
      route: ROUTE_ADMIN_CONTENT,
    },
    LAYOUT: {
      id: 'LAYOUT',
      route: ROUTE_ADMIN_LAYOUT,
    },
    USER_GROUP: {
      id: 'USER_GROUP',
      route: ROUTE_ADMIN_USER_GROUP,
    },
    USER: {
      id: 'USER',
      route: ROUTE_ADMIN_USER,
    },
    USER_ROLE: {
      id: 'USER_ROLE',
      route: ROUTE_ADMIN_USER_ROLE,
    },
    USER_TYPE: {
      id: 'USER_TYPE',
      route: ROUTE_ADMIN_USER_TYPE,
    },
    MODALITY_TYPE_NAME: {
      id: 'MODALITY_TYPE_NAME',
      route: ROUTE_ADMIN_MODALITY_TYPE_NAME,
    },
    SHIFT_WORK: {
      id: 'SHIFT_WORK',
      route: ROUTE_ADMIN_SHIFT_WORK,
    },
    STATISTICS_REPORT: {
      id: 'STATISTICS_REPORT',
      route: ROUTE_ADMIN_STATISTICS_REPORT,
    },
    PATIENT: {
      id: 'PATIENT',
      route: ROUTE_ADMIN_PATIENT,
    },
    STUDY: {
      id: 'STUDY',
      route: ROUTE_ADMIN_STUDY,
    },
    ORDER: {
      id: 'ORDER',
      route: ROUTE_ADMIN_ORDER,
    },
    STORE: {
      id: 'STORE',
      route: ROUTE_ADMIN_STORE,
    },
    REMOTE_STORE: {
      id: 'REMOTE_STORE',
      route: ROUTE_ADMIN_REMOTE_STORE,
    },
    FILE_STORE: {
      id: 'FILE_STORE',
      route: ROUTE_ADMIN_FILE_STORE,
    },
    USER_ACTIVITY: {
      id: 'USER_ACTIVITY',
      route: ROUTE_ADMIN_USER_ACTIVITY,
    },
    EVENT_LOG: {
      id: 'EVENT_LOG',
      route: ROUTE_ADMIN_EVENT_LOG,
    },
    CONFIG: {
      id: 'CONFIG',
      route: ROUTE_ADMIN_CONFIG,
    },
    DISPLAY_CONFIG: {
      id: 'DISPLAY_CONFIG',
      route: ROUTE_ADMIN_DISPLAY_CONFIG,
    },
    APPLICATION: {
      id: 'APPLICATION',
      route: ROUTE_ADMIN_APPLICATION,
    },
    WORKSTATION: {
      id: 'WORKSTATION',
      route: ROUTE_ADMIN_WORKSTATION,
    },
  },
} as const;

const AdminSidebar = () => {
  const translate = useTranslate();

  const selectedNodes = useMatchItemsByPathname(Object.values(NODES.CHILDREN));
  const dispatch = useAppDispatch();
  const currentItemMenuExpanded = useAppSelector(getItemMenuExpanded);
  const trees = useMemo<IRenderTree[]>(
    () => [
      {
        MyTreeItemProps: {
          nodeId: NODES.TOP.USER_ADMIN.id,
          label: translate.pages.admin.userAdmin(),
          ContentProps: {
            labelCollapsedIcon: <UserSettingIcon color="primary" />,
            labelIcon: <UserSettingIcon color="primary" />,
          },
        },
        children: [
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.USER.id,
              label: (
                <Link to={NODES.CHILDREN.USER.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.user.name()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.USER_GROUP.id,
              label: (
                <Link to={NODES.CHILDREN.USER_GROUP.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.group.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.CERTIFICATE.id,
              label: (
                <Link to={NODES.CHILDREN.CERTIFICATE.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.certificate.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.USER_ROLE.id,
              label: (
                <Link to={NODES.CHILDREN.USER_ROLE.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.role.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.USER_TYPE.id,
              label: (
                <Link to={NODES.CHILDREN.USER_TYPE.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.userType.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.DEPARTMENTS.id,
              label: (
                <Link to={NODES.CHILDREN.DEPARTMENTS.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.department.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
        ],
      },
      {
        MyTreeItemProps: {
          nodeId: NODES.TOP.ROOM_ADMIN.id,
          label: translate.pages.admin.roomAdmin(),
          ContentProps: {
            labelCollapsedIcon: <ModalityRoomIcon color="primary" />,
            labelExpandedIcon: <ModalityRoomIcon color="primary" />,
          },
        },
        children: [
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.MODALITIES.id,
              label: (
                <Link to={NODES.CHILDREN.MODALITIES.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.modality.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.MODALITY_GROUP.id,
              label: (
                <Link to={NODES.CHILDREN.MODALITY_GROUP.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.modalityGroup.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.MODALITY_ROOM.id,
              label: (
                <Link to={NODES.CHILDREN.MODALITY_ROOM.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.modalityRoom.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.MODALITY_TYPE.id,
              label: (
                <Link to={NODES.CHILDREN.MODALITY_TYPE.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.modalityType.adminTitle()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.MODALITY_TYPE_NAME.id,
              label: (
                <Link to={NODES.CHILDREN.MODALITY_TYPE_NAME.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.modalityTypeName.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.SHIFT_WORK.id,
              label: (
                <Link to={NODES.CHILDREN.SHIFT_WORK.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.shiftWork.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
        ],
      },
      {
        MyTreeItemProps: {
          nodeId: NODES.TOP.DIANOSIS_ADMIN.id,
          label: translate.pages.admin.diagnosisAdmin(),
          ContentProps: {
            labelCollapsedIcon: <DiagnosisIcon color="primary" />,
            labelExpandedIcon: <DiagnosisIcon color="primary" />,
          },
        },
        children: [
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.PROCEDURE.id,
              label: (
                <Link to={NODES.CHILDREN.PROCEDURE.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.procedure.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.PROCEDURE_GROUP.id,
              label: (
                <Link to={NODES.CHILDREN.PROCEDURE_GROUP.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.procedureGroup.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.CONTENT.id,
              label: (
                <Link to={NODES.CHILDREN.CONTENT.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.content.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.CONTENT_GROUP.id,
              label: (
                <Link to={NODES.CHILDREN.CONTENT_GROUP.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.contentGroup.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.LAYOUT.id,
              label: (
                <Link to={NODES.CHILDREN.LAYOUT.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.layout.title.long()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.STATISTICS_REPORT.id,
              label: (
                <Link to={NODES.CHILDREN.STATISTICS_REPORT.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.statisticsReport.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
        ],
      },
      {
        MyTreeItemProps: {
          nodeId: NODES.TOP.ORDER_ADMIN.id,
          label: translate.pages.admin.orderAdmin(),
          ContentProps: {
            labelCollapsedIcon: <ViewImageIcon color="primary" />,
            labelExpandedIcon: <ViewImageIcon color="primary" />,
          },
        },
        children: [
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.PATIENT.id,
              label: (
                <Link to={NODES.CHILDREN.PATIENT.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.patient.adminTitle()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.STUDY.id,
              label: (
                <Link to={NODES.CHILDREN.STUDY.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.study.adminTitle()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.ORDER.id,
              label: (
                <Link to={NODES.CHILDREN.ORDER.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.order.adminTitle()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
        ],
      },
      {
        MyTreeItemProps: {
          nodeId: NODES.TOP.STORAGE_ADMIN.id,
          label: translate.pages.admin.storageAdmin(),
          ContentProps: {
            labelCollapsedIcon: <ItechStorageIcon color="primary" />,
            labelExpandedIcon: <ItechStorageIcon color="primary" />,
          },
        },
        children: [
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.STORE.id,
              label: (
                <Link to={NODES.CHILDREN.STORE.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.store.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.REMOTE_STORE.id,
              label: (
                <Link to={NODES.CHILDREN.REMOTE_STORE.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.remoteStore.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.FILE_STORE.id,
              label: (
                <Link to={NODES.CHILDREN.FILE_STORE.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.fileStore.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
        ],
      },
      {
        MyTreeItemProps: {
          nodeId: NODES.TOP.HISTORY_ADMIN.id,
          label: translate.pages.admin.historyAdmin(),
          ContentProps: {
            labelCollapsedIcon: <DiaryIcon color="primary" />,
            labelExpandedIcon: <DiaryIcon color="primary" />,
          },
        },
        children: [
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.USER_ACTIVITY.id,
              label: (
                <Link to={NODES.CHILDREN.USER_ACTIVITY.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.userActivity.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.EVENT_LOG.id,
              label: (
                <Link to={NODES.CHILDREN.EVENT_LOG.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.eventLog.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
        ],
      },
      {
        MyTreeItemProps: {
          nodeId: NODES.TOP.SYSTEM_ADMIN.id,
          label: translate.pages.admin.systemAdmin(),
          ContentProps: {
            labelCollapsedIcon: <SettingIcon color="primary" />,
            labelExpandedIcon: <SettingIcon color="primary" />,
          },
        },
        children: [
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.CONFIG.id,
              label: (
                <Link to={NODES.CHILDREN.CONFIG.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.config.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.APPLICATION.id,
              label: (
                <Link to={NODES.CHILDREN.APPLICATION.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.application.title.short()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.DISPLAY_CONFIG.id,
              label: (
                <Link to={NODES.CHILDREN.DISPLAY_CONFIG.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.displayConfig.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },

          {
            MyTreeItemProps: {
              nodeId: NODES.CHILDREN.WORKSTATION.id,
              label: (
                <Link to={NODES.CHILDREN.WORKSTATION.route}>
                  <StyledChildNodeWrapper>
                    {translate.resources.workstation.title()}
                  </StyledChildNodeWrapper>
                </Link>
              ),
              ContentProps: {
                labelIcon: <ItechFolderIcon color="primary" />,
              },
            },
          },
        ],
      },
    ],
    [
      translate.pages.admin,
      translate.resources.user,
      translate.resources.group,
      translate.resources.role,
      translate.resources.userType,
      translate.resources.department,
      translate.resources.certificate,
      translate.resources.modality,
      translate.resources.modalityGroup,
      translate.resources.modalityRoom,
      translate.resources.modalityType,
      translate.resources.modalityTypeName,
      translate.resources.shiftWork,
      translate.resources.procedure,
      translate.resources.procedureGroup,
      translate.resources.content,
      translate.resources.contentGroup,
      translate.resources.layout,
      translate.resources.statisticsReport,
      translate.resources.patient,
      translate.resources.study,
      translate.resources.order,
      translate.resources.store,
      translate.resources.remoteStore,
      translate.resources.fileStore,
      translate.resources.userActivity,
      translate.resources.eventLog,
      translate.resources.config,
      translate.resources.displayConfig,
      translate.resources.application,
      translate.resources.workstation,
    ],
  );

  return (
    <MyTreeView
      onNodeToggle={(_, nodeIds) => dispatch(setItemAdminMenuExpanded(nodeIds))}
      trees={trees}
      multiSelect={false}
      defaultExpanded={currentItemMenuExpanded}
      selected={selectedNodes[0]?.id || ''}
    />
  );
};

export default AdminSidebar;

const StyledChildNodeWrapper = styled(Typography)`
  width: 100%;
`;
