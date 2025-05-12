<script setup lang="ts">
import { ref, h, reactive, toRaw, onMounted } from "vue";
import { deviceDetection } from "@pureadmin/utils";
import { ElImage } from "element-plus";
import dayjs from "dayjs";
import type { PaginationProps } from "@pureadmin/table";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";

import {
  getArticleList
  // addArticle,
  // updateArticle,
  // deleteArticle
} from "@/api/articleMgt/article";

const form = reactive({
  title: "",
  author: "",
  status: "",
  createdTime: [],
  pageSize: 10,
  pageNum: 1
});
const columns = ref<TableColumnList>([
  {
    label: "勾选列", // 如果需要表格多选，此处label必须设置
    slot: "selection"
  },
  {
    label: "文章编号",
    prop: "id",
    width: 90
  },
  {
    label: "文章封面",
    prop: "cover",
    cellRenderer: ({ row }) =>
      h(ElImage, {
        fit: "cover",
        previewTeleported: true,
        src: row.cover,
        previewSrcList: [row.cover],
        class: "w-[24px] h-[24px] rounded-full align-middle"
      }),
    width: 90
  },
  {
    label: "文章标题",
    prop: "title",
    width: 100
  },
  {
    label: "文章作者",
    prop: "author",
    width: 130
  },
  {
    label: "文章内容",
    prop: "content",
    width: 130,
    cellRenderer: ({ row }) =>
      h("div", {
        class: "w-80 overflow-hidden text-ellipsis whitespace-nowrap",
        innerHTML: row.content
      })
  },
  {
    label: "状态",
    prop: "status",
    minWidth: 90,
    cellRenderer: scope =>
      h("div", scope.row.status === 1 ? "已启用" : "已停用")
  },
  {
    label: "创建时间",
    width: 200,
    prop: "createTime",
    formatter: ({ createdTime }) =>
      dayjs(createdTime).format("YYYY-MM-DD HH:mm:ss")
  }
]);
const dataList = ref([]);
const selectedId = ref("");
const loading = ref(true);
const formRef = ref();
const pagination = reactive<PaginationProps>({
  total: 0,
  pageSize: 4,
  currentPage: 1,
  background: true
});

const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
  onSearch();
};

async function onSearch() {
  loading.value = true;
  const { data } = await getArticleList(toRaw(form));
  dataList.value = data.list;
  pagination.total = data.total;
  pagination.pageSize = data.pageSize;
  pagination.currentPage = data.currentPage;

  setTimeout(() => {
    loading.value = false;
  }, 500);
}

function handleSizeChange(val: number) {
  console.log(`${val} items per page`);
  form.pageSize = val;
  onSearch();
}

function handleCurrentChange(val: number) {
  console.log(`current page: ${val}`);
  form.pageNum = val;
  onSearch();
}

onMounted(async () => {
  onSearch();
});
defineExpose({ selectedId });
</script>

<template>
  <div :class="['w-full', 'mt-2']">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="文章标题：" prop="title">
        <el-input
          v-model="form.title"
          placeholder="请输入文章标题"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="作者名称：" prop="author">
        <el-input
          v-model="form.author"
          placeholder="请输入作者名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择"
          clearable
          class="!w-[180px]"
        >
          <el-option label="已开启" :value="1" />
          <el-option label="已关闭" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间：" prop="createdTime">
        <el-date-picker
          v-model="form.createdTime"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="截止日期"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD  HH:mm:ss"
          date-format="YYYY/MM/DD HH:mm:ss"
          time-format="A hh:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <PureTableBar title="" :columns="columns">
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          row-key="id"
          adaptive
          single-selection
          :adaptiveConfig="{ offsetBottom: 108 }"
          align-whole="center"
          table-layout="auto"
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="{ ...pagination, size }"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #selection="{ row }">
            <el-radio v-model="selectedId" :value="row.id" />
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

:deep(.el-button:focus-visible) {
  outline: none;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
