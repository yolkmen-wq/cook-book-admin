import { http } from "@/utils/http";

// type Result = {
//   success: boolean;
//   data?: Array<any>;
// };

type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

/** 获取系统管理-用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<ResultTable>("post", "/api/user", { data });
};

/** 删除系统管理-用户管理列表-用户*/
export const deleteUser = (data?: object) => {
  return http.request<ResultTable>("post", "/api/user/delete", { data });
};

/** 修改系统管理-用户管理列表-用户信息 */
export const updateUser = (data?: object) => {
  return http.request<ResultTable>("post", "/api/user/update", { data });
};

/** 分配系统管理-用户管理列表-用户角色 */
export const assignUserRole = (data?: object) => {
  return http.request<ResultTable>("post", "/api/user/assignRole", { data });
};
