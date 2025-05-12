<script setup lang="ts">
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
import { getDictDataList } from "@/api/systemMgt/dict";
import { deviceDetection } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
import articleList from "@/views/article/carouselMgt/components/articleList.vue";
import { h, ref, onMounted } from "vue";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    jumpType: "1",
    imageUrl: "",
    keyWord: "",
    readonly: false
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const jumpTypeOptions = ref([]);
const formRef = ref();

function getRef() {
  return ruleFormRef.value;
}

function chooseArticle() {
  console.log("chooseArticle");
  addDialog({
    title: "选择文章",
    width: "46%",
    draggable: true,
    fullscreen: deviceDetection(),
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(articleList, { ref: formRef, formInline: null }),
    beforeSure: (done, { options }) => {
      // const FormRef = formRef.value.getRef();
      console.log("beforeSure", options);
      console.log("FormRef", formRef.value.selectedId);
      newFormInline.value.keyWord = formRef.value.selectedId;
      done(); // 关闭弹框
    }
  });
}

onMounted(() => {
  getDictDataList({ dictType: "sys_jump_type" }).then(res => {
    if (res.success) {
      jumpTypeOptions.value = res.data.list.map(item => ({
        label: item.dictLabel,
        value: item.dictValue
      }));
    }
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
        <el-form-item label="轮播图片" prop="imageUrl">
          <el-input
            v-model="newFormInline.imageUrl"
            clearable
            placeholder="请输入轮播图名片"
            :readonly="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
    </el-row>
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="跳转类型" prop="jumpType">
          <el-radio-group v-model="newFormInline.jumpType">
            <el-radio
              v-for="(item, index) in jumpTypeOptions"
              :key="index"
              :value="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </re-col>
    </el-row>
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="文章详情" prop="keyWord">
          <div v-if="newFormInline.jumpType == 1" class="flex">
            <el-button @click="chooseArticle">选择文章</el-button>
            <el-input v-model="newFormInline.keyWord" />
          </div>
          <div v-if="newFormInline.jumpType == 2" class="flex">
            <el-button @click="chooseArticle">选择文章</el-button>
            <el-input v-model="newFormInline.keyWord" />
          </div>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
