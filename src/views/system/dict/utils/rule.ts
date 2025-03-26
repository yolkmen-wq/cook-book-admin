import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  dictName: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
  dictType: [{ required: true, message: "请输入字典类型", trigger: "blur" }]
});

export const formRules2 = reactive(<FormRules>{
  dictLabel: [{ required: true, message: "请输入字典标签", trigger: "blur" }],
  dictValue: [{ required: true, message: "请输入字典键值", trigger: "blur" }]
});
