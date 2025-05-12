import { http } from "@/utils/http";

export type FileResult = {
  success: boolean;
  data: {
    /** 文件地址 */
    url: string;
  };
};

/** 上传文件 */
export const uploadFile = (data?: object) => {
  return http.request<FileResult>(
    "post",
    "/api/file/upload",
    { data },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
