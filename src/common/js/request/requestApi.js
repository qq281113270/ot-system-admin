/*
 * @Author: your name
 * @Date: 2020-12-14 10:03:45
 * @LastEditTime: 2022-06-09 14:12:19
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsAdmin/src/common/js/request/requestApi.js
 */
import Request, { gql, GraphqlClient } from "./request";
import filterGraphqlData from "./filterGraphqlData";

var userId = "559645cd1a38532d14349246";

// 获取验证码
// export const getVerifyCode = () => {
//   return Request.get("/set/user/getVerifyCode");
// };

// export const getVerifyCode = () => {
//   // return Request.get("/set/user/getVerifyCode");
//   return GraphqlClient.query({
//     query: gql`
//       ${schema}
//     `,
//     variables: parameter,
//   });
// };

// 获取验证码
export const getVerifyCode = () => {
  return GraphqlClient.query(
    {
      operationName: "getVerifyCode",
      query: `
      query{
        getVerifyCode {
            code
            message
            data {
              svg
            }
          }
      }
    `,
    },
    {
      filterData: true,
    }
  );
};

// 注册
export const register = (parameter) => {
  return GraphqlClient.mutate({
    operationName: "createUser",
    mutation: `
        mutation($userInfo: UserInfoInput!) { 
          createUser(userInfo: $userInfo) {
              code
              message
            }
        }
    `,
    variables: {
      userInfo: parameter,
    },
  });
};

// 登录
export const login = (parameter) => {
  return Request.post("/set/user/login", parameter);
};

// 查询
export const query = (schema, parameter) => {
  return GraphqlClient.query({
    query: gql`
      ${schema}
    `,
    variables: parameter,
  });
};

export const mutation = (schema, parameter) => {
  return GraphqlClient.mutate({
    mutation: `${schema}`,
    variables: parameter,
  });
};


export const getUser = () => {
  return GraphqlClient.query({
    query: gql`
      {
        hello
      }
    `,
  });
};

//   更改
export const setUserInfo = (parameter) => {
  return GraphqlClient.mutate({
    operationName: "setUserInfo",
    mutation: `
      mutation ($user: UserInfoInput!) {
        setUserInfo(user: $user) {
          code
          mgs
          data {
            name
            phone
          }
        }
      }
    `,
    variables: {
      user: {
        id: 123,
        toKen: "123",
      },
    },
  });
};

// 查询
export const getUserInfo = (id = "") => {
  return GraphqlClient.query(
    {
      operationName: "getUserInfo",
      query: `
      query{
          getUserInfo(id: "${id}") {
            code
            message
            data {
              name
              phone
            }
          }
      }
    `,
    },
    {
      filterData: true,
    }
  );
};

// // 查询
// export const getUserInfo = (id='') => {
//   return GraphqlClient.query({
//     query: `
//       query($id:ID){
//           getUserInfo(id:$id) {
//             code
//             message
//             data {
//               name
//               phone
//             }
//           }
//       }
//     `,
//     variables: {
//       id:123
//     },
//   });
// };

export const hello = (data) => {
  return GraphqlClient.query({
    operationName: "getUserInfo",
    name: "hello",
    query: gql`
            {
                hello()
                {

                }
            }
        `,
  });
};
