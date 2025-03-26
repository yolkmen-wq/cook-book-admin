<script setup lang="ts">
import { onMounted, ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
import { getDictDataList } from "@/api/systemMgt/dict";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    carouselName: "",
    carouselDesc: "",
    position: "",
    readonly: false
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);
const positionOptions = ref([]);

onMounted(() => {
  getDictDataList({ dictType: "sys_carousel_position" }).then(res => {
    positionOptions.value = res.data.list.map(item => ({
      value: item.dictValue,
      label: item.dictLabel
    }));
    console.log("res", res);
  });
});

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
        <el-form-item label="轮播图名称" prop="carouselName">
          <el-input
            v-model="newFormInline.carouselName"
            clearable
            placeholder="请输入轮播图名称"
            :readonly="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="轮播图描述" prop="carouselDesc">
          <el-input
            v-model="newFormInline.carouselDesc"
            clearable
            placeholder="请输入轮播图描述"
            :readonly="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
    </el-row>
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="轮播图位置" prop="position">
          <el-radio-group v-model="newFormInline.position">
            <el-radio
              v-for="(item, index) in positionOptions"
              :key="index"
              :value="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
