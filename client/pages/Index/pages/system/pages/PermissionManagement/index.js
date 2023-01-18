import {
  // Layout,
  //  Menu,
  Button
} from "antd";
import { getPermissionList } from "client/assets/js/request";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import TableButton from "client/component/TableButton";
import { tablePage } from "client/component/TablePage";
import { addRouterApi } from "client/router";
import React, { Component } from "react";
// 权限控制
@setBreadcrumbAndTitle({
  //设置面包屑和标题
  breadcrumb: [
    {
      label: "权限管理"
      // href: "http://localhost:3000/index",
      // path: "xxxx",
    }
    // {
    //   label: "菜单2",
    //   // href: "http://localhost:3000/index",
    //   path: "/",
    //   component: ""
    // }
    // {
    //   label: "菜单3",
    //   // href: "http://localhost:3000/index",
    //   // path: "/",
    //   component: "",
    // },
  ],
  title: "权限管理"
})
@addRouterApi
@tablePage
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: {
        list: []
      },
      dataSource: []
    };
  }

  // // 获取默认搜索参数
  // getDefaultSearchParams = () => {
  //   return {
  //     status: ""
  //   };
  // };

  // 定义搜索栏字段
  getSearchFields() {
    return [
      {
        label: "权限名称",
        name: "name",
        type: "input",
        span: 1
      },
      {
        label: "权限ID",
        name: "id",
        type: "input"
      },
      {
        label: "权限parentID",
        name: "parentId",
        type: "input"
      },
      {
        label: "权限key",
        name: "authKey",
        type: "input"
      }
    ];
  }

  // 定义Tab字段
  getTabFilterItems = () => {
    return [];
  };

  // 定义表头字段
  getColumns = () => {
    const { pushRoute, routePaths: { permissionManagementDetails } = {} } =
      this.props;
    return [
      {
        title: "权限名称",
        dataIndex: "name",
        key: "name",
        fixed: "left"
      },
      {
        title: "权限ID",
        dataIndex: "id",
        key: "id"
      },

      {
        title: "权限parentID",
        dataIndex: "parentId",
        key: "parentId"
      },

      {
        title: "权限key",
        dataIndex: "authKey",
        key: "authKey"
      },
      {
        title: "描述",
        dataIndex: "description",
        key: "description"
      },

      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime"
      },
      {
        title: "更新时间",
        dataIndex: "updateTime",
        key: "updateTime"
      },
      {
        title: "操作",
        dataIndex: "actions",
        key: "actions",
        width: 300,
        fixed: "right",
        render: (text, row) => {
          const { id } = row;

          return (
            <TableButton
              render={[
                {
                  // showPopconfirm: true, // 是否需要弹窗提示
                  // confirmInfo: "你确定要发布该标签吗？", //弹窗信息
                  label: "编辑", // 按钮文字
                  status: true, //权限控制
                  props: {
                    onClick: () => {
                      pushRoute({
                        path: permissionManagementDetails,
                        params: {
                          action: "edit",
                          id
                        } // 地址传参
                      });
                    }
                  }
                },
                {
                  // showPopconfirm: true, // 是否需要弹窗提示
                  // confirmInfo: "你确定要发布该标签吗？", //弹窗信息
                  label: "查看", // 按钮文字
                  status: true, //权限控制
                  props: {
                    onClick: () => {}
                  }
                },
                {
                  // showPopconfirm: true, // 是否需要弹窗提示
                  // confirmInfo: "你确定要发布该标签吗？", //弹窗信息
                  label: "删除", // 按钮文字
                  status: true, //权限控制
                  props: {
                    onClick: () => {}
                  }
                }
              ]}
            />
          );
        }
      }
    ];
  };

  /**
   * 定义表格的数据加载功能
   */
  tableDataLoader = async (searchParams = {}) => {
    const { data } = await getPermissionList(searchParams);

    return data;
  };

  getTableProps = () => {
    return {};
  };
  componentDidMount() {}
  render() {
    const { pushRoute, routePaths: { permissionManagementDetails } = {} } =
      this.props;
    return (
      <div className="table-page">
        <div
          style={{
            marginBottom: "20px"
          }}>
          <Button
            type="primary"
            onClick={() => {
              console.log("this.props=", this.props);

              pushRoute({
                path: permissionManagementDetails,
                params: {
                  action: "create"
                } // 地址传参
              });
            }}>
            新建权限
          </Button>
        </div>
        {this.renderSearch({
          shrinkLength: 5,
          initialValues: {
            type: ""
          }
          // style: {
          //   padding: "10px 0",
          // },
        })}
        {this.renderTable({
          rowKey: "id",
          scroll: {
            x: 1300
          }
        })}
      </div>
    );
  }
}
export default Index;
