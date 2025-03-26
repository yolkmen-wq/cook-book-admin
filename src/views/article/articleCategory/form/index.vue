<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    categoryName: "",
    categoryDesc: "",
    categoryPic: "",
    showCategory: 1,
    categorySort: 1
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input
            v-model="newFormInline.categoryName"
            clearable
            placeholder="请输入分类名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="分类图片" prop="categoryPic">
          <el-input
            v-model="newFormInline.categoryPic"
            clearable
            placeholder="请输入分类图片"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="分类描述" prop="categoryDesc">
          <el-input
            v-model="newFormInline.categoryDesc"
            clearable
            placeholder="请输入分类描述"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="排序" prop="categorySort">
          <el-input
            v-model="newFormInline.categorySort"
            type="text"
            clearable
            placeholder="请输入排序"
            :formatter="value => Number(value)"
            :parser="value => Number(value)"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="状态" prop="showCategory">
          <el-switch
            v-model="newFormInline.showCategory"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            active-text="显示"
            inactive-text="隐藏"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
