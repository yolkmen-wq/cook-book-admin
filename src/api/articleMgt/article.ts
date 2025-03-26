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

/** 获取文章管理-文章列表 */
export const getArticleList = (data?: object) => {
  return http.request<ResultTable>("post", "/api/article", { data });
};

/** 新增文章管理-文章 */
export const addArticle = (data?: object) => {
  return http.request<Result>("post", "/api/article/create", { data });
};

// /** 获取系统管理-菜单管理-菜单详情 */
// export const getMenuDtl = (id: number) => {
//   return http.request<Result>("get", `/api/menu/detail?id=${id}`);
// };

/** 修改文章管理-文章管理-文章详情 */
export const updateArticle = (data?: object) => {
  return http.request<Result>("post", "/api/article/update", { data });
};

/** 删除文章管理-文章管理-文章 */
export const deleteArticle = (id: number) => {
  return http.request<Result>("get", `/api/article/delete/${id}`);
};
