import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  cover: [{ required: true, message: "文章封面为必填项", trigger: "blur" }],
  title: [{ required: true, message: "文章标题为必填项", trigger: "blur" }],
  category: [
    { required: true, message: "文章分类为必填项", trigger: "change" }
  ],
  content: [{ required: true, message: "文章内容为必填项", trigger: "blur" }],
  author: [{ required: true, message: "文章作者为必填项", trigger: "blur" }]
});
