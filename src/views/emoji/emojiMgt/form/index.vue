<script setup lang="ts">
import { onMounted, ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
import imageUpload from "@/components/Upload/src/ImageUpload";
import { getDictDataList } from "@/api/systemMgt/dict";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    url: "",
    name: "",
    status: 1,
    categoryId: 0,
    readonly: false
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);
const fileList = ref([]);
const options = ref([]);

function getRef() {
  return ruleFormRef.value;
}

onMounted(async () => {
  if (props.formInline.url) {
    fileList.value = [
      { name: props.formInline.url, url: props.formInline.url }
    ];
  }
  const res = await getDictDataList({ dictType: "sys_emoji_category" });
  options.value = res.data.list.map(item => {
    return { label: item.dictLabel, value: item.dictValue.toString() };
  });
});

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="110px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="12" :sm="12">
        <el-form-item label="表情名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入表情名称"
            :readonly="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="12" :sm="12">
        <el-form-item label="表情分类" prop="categoryId">
          <el-select
            v-model="newFormInline.categoryId"
            clearable
            placeholder="请输入表情分类"
            :readonly="newFormInline.readonly"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>
    </el-row>
    <el-row :gutter="30">
      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="Unicode编码" prop="unicode">
          <el-input
            v-model="newFormInline.unicode"
            clearable
            placeholder="请输入Unicode编码"
            :readonly="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
    </el-row>
    <el-row :gutter="30">
      <re-col :value="12" :xs="12" :sm="12">
        <el-form-item label="表情图片" prop="url">
          <imageUpload v-model="fileList" />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="12" :sm="12">
        <el-form-item label="显示状态" prop="status">
          <el-switch
            v-model="newFormInline.status"
            inline-prompt
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="停用"
            :style="switchStyle"
            :disabled="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
