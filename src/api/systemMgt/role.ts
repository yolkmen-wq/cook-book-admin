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

/** 获取系统管理-角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<ResultTable>("post", "/api/role", { data });
};

/** 更新系统管理-角色管理-角色 */
export const updateRole = (data?: object) => {
  return http.request<ResultTable>("post", "/api/role/update", { data });
};

/** 新增系统管理-角色管理-角色 */
export const addRole = (data?: object) => {
  return http.request<ResultTable>("post", "/api/role/add", { data });
};

/** 获取系统管理-角色管理-角色菜单 */
export const getRoleMenuIds = (data?: object) => {
  return http.request<ResultTable>("post", "/api/role/role-menu-ids", { data });
};

/** 保存系统管理-角色管理-角色菜单 */
export const saveRoleMenus = (data?: object) => {
  return http.request<ResultTable>("post", "/api/role/save-role-menus", { data });
};

/** 删除系统管理-角色管理-角色 */
export const deleteRole = (id: number) => {
  return http.request<ResultTable>("get", `/api/role/delete?id=${id}`);
};
