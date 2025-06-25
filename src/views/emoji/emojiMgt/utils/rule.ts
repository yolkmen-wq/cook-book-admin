import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "表情名称为必填项", trigger: "blur" }],
  categoryId: [
    { required: true, message: "表情分类为必填项", trigger: "change" }
  ],
  unicode: [
    { required: true, message: "Unicode编码为必填项", trigger: "blur" }
  ],
  author: [{ required: true, message: "文章作者为必填项", trigger: "blur" }]
});
