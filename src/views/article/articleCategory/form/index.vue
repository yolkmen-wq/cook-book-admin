<script setup lang="ts">
import { ref, onMounted } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { usePublicHooks } from "../../hooks";
import type {
  UploadProps,
  UploadRequestOptions,
  UploadUserFile
} from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { uploadFile } from "@/api/file";

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
const fileList = ref<UploadUserFile[]>();

function getRef() {
  return ruleFormRef.value;
}

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  console.log(33, response, uploadFile);
};

const handleRemove: UploadProps["onRemove"] = file => {
  newFormInline.value.categoryPic = "";
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = rawFile => {
  if (!["image/jpeg", "image/png", "image/gif"].includes(rawFile.type)) {
    ElMessage.error("文件类型不支持!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("文件大小不能超过2MB!");
    return false;
  }
  return true;
};

const uploadFiles = (options: UploadRequestOptions) => {
  console.log(50, options);
  const formData = new FormData();
  formData.append("key", options.file.name); // 文件名
  formData.append("file", options.file); // file对象
  uploadFile(formData)
    .then(res => {
      newFormInline.value.categoryPic = res.data.url;
      fileList.value = [
        {
          name: options.file.name,
          url: res.data.url
        }
      ];
      return Promise.resolve();
    })
    .catch(err => {
      return Promise.reject(err);
    });
  return Promise.resolve();
};

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handlePictureCardPreview: UploadProps["onPreview"] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

onMounted(() => {
  if (newFormInline.value.categoryPic) {
    fileList.value = [
      {
        name: newFormInline.value.categoryPic,
        url: newFormInline.value.categoryPic
      }
    ];
  }
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
          <el-upload
            v-model:file-list="fileList"
            class="avatar-uploader"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :limit="2"
            :http-request="uploadFiles"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
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
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
