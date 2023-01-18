import "./index.less";

import { Input, message } from "antd";
import {
  editUser,
  getRoleList,
  getUserInfo,
  getUserList
} from "client/assets/js/request";
import FormPage from "client/component/FormPage";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import TableButton from "client/component/TableButton";
import TablePicker from "client/component/TablePicker";
import TreePicker from "client/component/TreePicker";
import { mapRedux } from "client/redux";
import { addRouterApi, routePaths } from "client/router";
import React from "react";

class Index extends FormPage {
  constructor(props) {
    super(props);
    this.state = {
      ...this.defaultState(),
      data: {}
    };
  }
  /**
   * 用于将从接口获取到的初始化数据，转换成form需要的格式
   * 这个函数需要在getInitData中手动调用，因此函数名不限于mapInitData
   */
  mapInitData = async (initData) => {
    return initData;
  };
  // 初始化值
  getInitialValues = async () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    console.log("this.props=", this.props);
    const { data: { user = {} } = {} } = await getUserInfo({
      id
    });

    this.setState({
      data: user
    });

    return await this.mapInitData(user);
  };

  /**
   * 用于将form的字段值转换为接口需要的格式
   */
  mapSubmitData = (formData) => {
    return formData;
  };
  // 提交请求到接口
  onSubmitForm = async (formData) => {
    const {
      history: { back }
    } = this.props;
    const values = await this.mapSubmitData(formData);
    const { message: mgs } = await editUser({ ...values });
    message.success(mgs);
    setTimeout(() => {
      back();
    }, 500);
  };
  getFields = () => {
    return [
      {
        type: "section",
        title: "详情基本设置",
        items: [
          {
            label: "用户ID",
            name: "id",
            // type: "input",
            // labelCol: { span: 5 },
            // wrapperCol: { span: 10 },

            render: (props) => {
              const { value } = props;

              return <div>{value}</div>;
            },
            rules: [
              // {
              //   required: true,
              //   message: "Please input your username1"
              // }
            ]
          },
          {
            label: "用户名称",
            name: "name",
            type: "input",
            props: {
              showCount: true,
              maxLength: 20
            },
            // labelCol: { span: 5 },
            // wrapperCol: { span: 10 },
            rules: [
              {
                required: true,
                message: "请输入用户名称"
              }
            ]
          },
          {
            label: "设置角色",
            name: "role",
            // type: "input",
            // labelCol: { span: 5 },
            // wrapperCol: { span: 10 },

            render: (props) => {
              const { value, onChange } = props;

              return (
                <TablePicker
                  buttonText="请选择角色"
                  value={value}
                  onChange={onChange}
                  request={getRoleList}
                  modalProps={{
                    title: "设置角色"
                  }}
                  tableProps={{
                    rowKey: "name",
                    getSearchFields: () => {
                      return [
                        {
                          label: "角色名称",
                          name: "name",
                          type: "input",
                          span: 1
                          // labelCol: { span: 5 },
                          // wrapperCol: { span: 10 },
                          // rules: [
                          //   {
                          //     required: true,
                          //     message: "Please input your username1",
                          //   },
                          // ],
                        },
                        {
                          label: "角色ID",
                          name: "id",
                          type: "input"
                          // span: 2
                          // labelCol: { span: 5 },
                          // wrapperCol: { span: 10 }
                          // rules: [
                          //   {
                          //     required: true,
                          //     message: "Please input your username2",
                          //   },
                          // ],
                        }
                      ];
                    },
                    getColumns: () => {
                      const {
                        pushRoute,
                        routePaths: { userManagementDetails } = {}
                      } = this.props;
                      return [
                        {
                          title: "角色ID",
                          dataIndex: "id",
                          key: "id"
                        },
                        {
                          title: "角色名称",
                          dataIndex: "name",
                          key: "name"
                        },
                        {
                          title: "描述",
                          dataIndex: "description",
                          key: "description"
                        },
                        // {
                        //   title: "创建时间",
                        //   dataIndex: "createTime",
                        //   key: "createTime"
                        // },
                        // {
                        //   title: "更新时间",
                        //   dataIndex: "updateTime",
                        //   key: "updateTime"
                        // },
                        {
                          title: "操作",
                          dataIndex: "actions",
                          key: "actions",
                          width: 180,
                          render: (text, row) => {
                            const { id } = row;

                            return (
                              <TableButton
                                render={[
                                  {
                                    // showPopconfirm: true, // 是否需要弹窗提示
                                    // confirmInfo: "你确定要发布该标签吗？", //弹窗信息
                                    label: "查看角色用户权限", // 按钮文字
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
                    }
                  }}></TablePicker>
              );
            },
            rules: [
              // {
              //   required: true,
              //   message: "Please input your username1"
              // }
            ]
          }
          // {
          //   label: "邮箱地址",
          //   name: "email",
          //   type: "input",
          //   props: {
          //     showCount: true,
          //     maxLength: 100
          //   },
          //   // labelCol: { span: 5 },
          //   // wrapperCol: { span: 10 },
          //   rules: [
          //     {
          //       required: true,
          //       message: "请输入邮箱地址"
          //     }
          //   ]
          // },
          // {
          //   label: "手机号码",
          //   name: "phone",
          //   type: "input",
          //   props: {
          //     showCount: true,
          //     maxLength: 11
          //   },
          //   // labelCol: { span: 5 },
          //   // wrapperCol: { span: 10 },
          //   rules: [
          //     {
          //       required: true,
          //       message: "请输入手机号码"
          //     }
          //   ]
          // },
          // {
          //   label: "用户类型",
          //   name: "type",
          //   type: "select",
          //   props: {
          //     options: [
          //       {
          //         label: "管理员",
          //         value: 1
          //       },
          //       {
          //         label: "会员",
          //         value: 2
          //       }
          //     ]
          //   },
          //   itemProps: {},
          //   options: {},
          //   // labelCol: { span: 5 },
          //   // wrapperCol: { span: 10 },
          //   rules: [
          //     {
          //       required: true,
          //       message: "请选择用户类型"
          //     }
          //   ]
          // }
        ]
      }
    ];
  };

  // // 底部按钮
  // getFooter = () => {
  //   return (
  //     <div className="button-box">
  //       <Button type="primary" onClick={() => {}}>
  //         确认
  //       </Button>
  //       <Button>返回</Button>
  //     </div>
  //   );
  // };
  componentDidMount() {}
  render() {
    return (
      <div className="form-page user-set-role-details">
        <TreePicker
          openButton={false}
          modalProps={{
            open: true,
            onCancel: () => {},
            onOk: () => {}
          }}
        />

        {this.renderForm()}
      </div>
    );
  }
}

export default mapRedux()(
  // 权限控制
  setBreadcrumbAndTitle({
    //设置面包屑和标题
    breadcrumb: [
      {
        label: "用户管理",
        path: routePaths.userManagement
      },
      {
        label: "详情"
        // href: "http://localhost:3000/index",
        // path: "/",
        // component: ""
      }
      // {
      //   label: "菜单3",
      //   // href: "http://localhost:3000/index",
      //   // path: "/",
      //   component: "",
      // },
    ]
    // title: "主页"
  })(addRouterApi(Index))
);
