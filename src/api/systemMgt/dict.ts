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

/** 获取系统管理-字典管理列表 */
export const getDictList = (data?: object) => {
  return http.request<ResultTable>("post", "/api/dict", { data });
};

/** 获取字典数据列表 */
export const getDictDataList = (data?: object) => {
  return http.request<ResultTable>("post", "/api/dict/dictData", {
    data
  });
};

/** 新增字典数据 */
export const addDictData = (data?: object) => {
  return http.request<ResultTable>("post", "/api/dict/dictData/add", {
    data
  });
};

/** 新增系统管理-字典管理-字典 */
export const addDict = (data?: object) => {
  return http.request<Result>("post", "/api/dict/create", { data });
};

/** 删除系统管理-字典管理-字典 */
export const deleteDict = (id: number) => {
  return http.request<Result>("get", `/api/dict/delete/${id}`);
};

/** 删除字典数据 */
export const deleteDictData = (id: number) => {
  return http.request<Result>("get", `/api/dict/dictData/delete/${id}`);
};

/** 修改系统管理-字典管理-字典详情 */
export const updateDict = (data?: object) => {
  return http.request<Result>("post", "/api/dict/update", { data });
};

/** 修改字典数据 */
export const updateDictData = (data?: object) => {
  return http.request<Result>("post", "/api/dict/dictData/update", { data });
};
