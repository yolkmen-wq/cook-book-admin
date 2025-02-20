import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: Array<any>;
};

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

/** 获取系统管理-菜单管理列表 */
export const getMenuList = (data?: object) => {
  return http.request<ResultTable>("post", "/api/menu", { data });
};

/** 获取系统管理-菜单管理-菜单详情 */
export const getMenuDtl = (id: number) => {
  return http.request<Result>("get", `/api/menu/detail?id=${id}`);
};

/** 修改系统管理-菜单管理-菜单详情 */
export const updateMenuDtl = (data?: object) => {
  return http.request<Result>("post", "/api/menu/update", { data });
};

/** 新增系统管理-菜单管理-菜单 */
export const addMenu = (data?: object) => {
  return http.request<Result>("post", "/api/menu/create", { data });
};

/** 删除系统管理-菜单管理-菜单 */
export const deleteMenu = (id: number) => {
  return http.request<Result>("get", `/api/menu/delete?id=${id}`);
};
