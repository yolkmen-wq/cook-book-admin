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

/** 获取文章分类-文章分类列表 */
export const getArticleCategoryList = (data?: object) => {
  return http.request<ResultTable>("post", "/api/article-cat", { data });
};

/** 新增文章分类-分类 */
export const addArticleCategory = (data?: object) => {
  return http.request<Result>("post", "/api/article-cat/create", { data });
};

/** 修改文章分类-文章分类-分类详情 */
export const updateArticleCategory = (data?: object) => {
  return http.request<Result>("post", "/api/article-cat/update", { data });
};

/** 修改文章分类-文章分类-分类详情 */
export const deleteArticleCategory = (id: number) => {
  return http.request<Result>("get", `/api/article-cat/delete/${id}`);
};
