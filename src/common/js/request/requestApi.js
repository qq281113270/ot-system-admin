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

// 查询
export const query = (operationName, schema, parameter = {}, options = {}) => {
  return GraphqlClient.query(
    {
      operationName,
      query: schema,
      variables: parameter,
    },
    {
      filterData: true,
      ...options,
    }
  );
};

// 变异
export const mutation = (
  operationName,
  schema,
  parameter = {},
  options = {}
) => {
  return GraphqlClient.mutate(
    {
      operationName,
      mutation: `${schema}`,
      variables: parameter,
    },
    {
      filterData: true,
      ...options,
    }
  );
};

// 获取验证码
export const getVerifyCode = () => {
  return query(
    "getVerifyCode",
    ` query{
      getVerifyCode {
          code
          message
          data {
            svg
          }
        }
    }
  `
  );
};

// 注册
export const register = (parameter) => {
  return mutation(
    "createUser",
    `
        mutation($userInfo: UserInfoInput!) { 
          createUser(userInfo: $userInfo) {
              code
              message
            }
        }
    `,
    {
      userInfo: parameter,
    }
  );
};

// 登录
export const login = (parameter) => {
  console.log("parameter=====", parameter);
  const { password, username, verificationCode } = parameter;
  return query(
    "login",
    ` query{
        login(
          password:"${password}",
          username:"${username}",
          verificationCode:"${verificationCode}",
          ){
            code
            data {
              token 
              userInfo {
                  name
                  phone
                  id
              } 
            }
            message
          } 
   }
    `

    // {
    //   userInfo: parameter,
    // }
  );

  //return Request.post("/set/user/login", parameter);
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
