<script setup lang="ts">
import { onMounted, ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
import { EditorUpload } from "../components";
import { getArticleCategoryList } from "@/api/articleMgt/articleCategory";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    higherDeptOptions: [],
    cover: "",
    category: "",
    tags: [],
    content: "",
    author: "",
    status: 1,
    readonly: false
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);
const options = ref([]);

function getRef() {
  return ruleFormRef.value;
}

onMounted(() => {
  getArticleCategoryList().then(res => {
    console.log("res", res);
    options.value = res.data.list.map(v => {
      return {
        label: v.categoryName,
        value: v.id
      };
    });
  });
});

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
        <el-form-item label="文章封面" prop="cover">
          <el-input
            v-model="newFormInline.cover"
            clearable
            placeholder="请输入文章封面"
            :readonly="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="newFormInline.title"
            clearable
            placeholder="请输入文章标题"
            :readonly="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
    </el-row>
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="文章分类" prop="category">
          <el-select
            v-model="newFormInline.category"
            placeholder="请选择文章分类"
            size="large"
            :disabled="newFormInline.readonly"
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
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="文章标签" prop="tags">
          <el-select
            v-model="newFormInline.tags"
            multiple
            placeholder="请选择文章标签"
            size="large"
            :disabled="newFormInline.readonly"
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
        <el-form-item label="文章内容" prop="content">
          <EditorUpload
            v-model="newFormInline.content"
            :readonly="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
    </el-row>
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="文章作者" prop="author">
          <el-input
            v-model="newFormInline.author"
            clearable
            placeholder="请输入文章作者"
            :readonly="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="文章状态" prop="status">
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
