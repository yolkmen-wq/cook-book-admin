<script setup lang="ts">
import { ref, reactive } from "vue";
import ReCol from "@/components/ReCol";
import { formRules2 } from "../utils/rule";
import { FormProps2 } from "../utils/types";
import { usePublicHooks } from "../../hooks";

const props = withDefaults(defineProps<FormProps2>(), {
  formInline: () => ({
    dictLabel: "",
    dictValue: "",
    status: 0,
    readonly: false
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
    :rules="formRules2"
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="字典标签" prop="dictName">
          <el-input
            v-model="newFormInline.dictLabel"
            clearable
            placeholder="请输入字典标签"
            :readonly="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
    </el-row>
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="字典键值" prop="dictType">
          <el-input
            v-model="newFormInline.dictValue"
            clearable
            placeholder="请输入字典键值"
            :readonly="newFormInline.readonly"
          />
        </el-form-item>
      </re-col>
    </el-row>
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="状态" prop="status">
          <el-radio-group
            v-model="newFormInline.status"
            :disabled="newFormInline.readonly"
          >
            <el-radio :value="0">正常</el-radio>
            <el-radio :value="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
