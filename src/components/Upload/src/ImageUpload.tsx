import {
  type PropType,
  ref,
  // unref,
  // computed,
  // nextTick,
  defineComponent
} from "vue";
import type {
  UploadProps,
  UploadRequestOptions
  // UploadUserFile
} from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { uploadFile } from "@/api/file";

const props = {
  /** 头部最左边的标题 */
  limit: {
    type: Number,
    default: 1
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  accept: {
    type: Array as PropType<any>,
    default: () => ["image/jpeg", "image/png", "image/gif"]
  },
  maxSize: {
    type: Number,
    default: 2
  }
};

const emits = ["update:modelValue", "onRemove", "onSuccess"];

export default defineComponent({
  name: "ImageUpload",
  props,
  emits,
  setup(props, { emit, slots, attrs }) {
    const fileList = ref(props.modelValue);

    const handleRemove: UploadProps["onRemove"] = file => {
      emit("onRemove", file);
    };

    const beforeAvatarUpload: UploadProps["beforeUpload"] = rawFile => {
      if (!props.accept.includes(rawFile.type)) {
        ElMessage.error("文件类型不支持!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > props.maxSize) {
        ElMessage.error(`文件大小不能超过${props.maxSize}MB!`);
        return false;
      }
      return true;
    };

    const uploadFiles = (options: UploadRequestOptions) => {
      const formData = new FormData();
      formData.append("key", options.file.name); // 文件名
      formData.append("file", options.file); // file对象
      uploadFile(formData)
        .then(res => {
          // emit("onSuccess", {
          //   name: options.file.name,
          //   url: res.data.url
          // });

          fileList.value.push({
            name: options.file.name,
            url: res.data.url
          });

          emit("update:modelValue", fileList.value);

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
    return () => (
      <>
        <div {...attrs}>
          <el-upload
            file-list={fileList.value}
            class="avatar-uploader"
            list-type="picture-card"
            before-upload={beforeAvatarUpload}
            limit={props.limit}
            http-request={uploadFiles}
            on-preview={handlePictureCardPreview}
            on-remove={handleRemove}
          >
            {slots?.default ? (
              slots.default()
            ) : (
              <el-icon>
                <Plus />
              </el-icon>
            )}
          </el-upload>
          <el-dialog v-model={dialogVisible.value}>
            <img w-full:src={dialogImageUrl.value} alt="Preview Image" />
          </el-dialog>
        </div>
      </>
    );
  }
});
