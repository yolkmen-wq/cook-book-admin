<script setup lang="ts">
import { ref } from "vue";
import { useDept } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "SystemDict"
});

const formRef = ref();
const formRef2 = ref();
const tableRef = ref();
const tableRef2 = ref();
const {
  form,
  formItem,
  loading,
  columns,
  columnsItems,
  dataList,
  dataItemList,
  onSearch,
  onSearch2,
  resetForm,
  openDialog,
  openDialog2,
  handleDelete,
  handleDelete2,
  handleSizeChange,
  handleCurrentChange,
  handleRowClick
} = useDept();

function onFullscreen() {
  // 重置表格高度
  tableRef.value.setAdaptive();
}
</script>

<template>
  <div class="main flex">
    <div class="left-content flex-1 mr-10">
      <el-form
        ref="formRef"
        :inline="true"
        :model="form"
        class="search-form bg-bg_color w-[50/100] pl-8 pt-[12px] overflow-auto"
      >
        <el-form-item label="字典名称：" prop="dictName">
          <el-input
            v-model="form.dictName"
            placeholder="请输入字典名称"
            clearable
            class="!w-[180px]"
          />
        </el-form-item>
        <el-form-item label="字典类型：" prop="dictType">
          <el-input
            v-model="form.dictType"
            placeholder="请输入字典类型"
            clearable
            class="!w-[180px]"
          />
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select
            v-model="form.status"
            placeholder="请选择状态"
            clearable
            class="!w-[180px]"
          >
            <el-option label="冻结" :value="1" />
            <el-option label="正常" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间：" prop="createTime">
          <el-date-picker
            v-model="form.createTime"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD HH:mm:ss"
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

      <PureTableBar
        title="字典管理"
        :columns="columns"
        :tableRef="tableRef?.getTableRef()"
        @refresh="onSearch"
        @fullscreen="onFullscreen"
      >
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog()"
          >
            新增
          </el-button>
        </template>
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            ref="tableRef"
            :adaptiveConfig="{ offsetBottom: 45 }"
            align-whole="center"
            row-key="id"
            showOverflowTooltip
            table-layout="auto"
            :loading="loading"
            :size="size"
            :data="dataList"
            :columns="dynamicColumns"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            @page-size-change="handleSizeChange"
            @page-current-change="handleCurrentChange"
            @row-click="handleRowClick"
          >
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                @click="openDialog('查看', row)"
              >
                查看字典
              </el-button>
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog('修改', row)"
              >
                修改
              </el-button>

              <el-popconfirm
                :title="`是否确认删除这条数据`"
                @confirm="handleDelete(row)"
              >
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="primary"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>
    <div class="right-content flex-1">
      <el-form
        ref="formRef2"
        :inline="true"
        :model="formItem"
        class="search-form bg-bg_color w-[50/100] pl-8 pt-[12px] overflow-auto"
      >
        <el-form-item label="字典标签：" prop="dictLabel">
          <el-input
            v-model="formItem.dictLabel"
            placeholder="请输入字典标签"
            clearable
            class="!w-[180px]"
          />
        </el-form-item>
        <el-form-item label="创建时间：" prop="createTime">
          <el-date-picker
            v-model="formItem.createTime"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :icon="useRenderIcon('ri:search-line')"
            :loading="loading"
            @click="onSearch2"
          >
            搜索
          </el-button>
          <el-button
            :icon="useRenderIcon(Refresh)"
            @click="resetForm(formRef2)"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>

      <PureTableBar
        title=""
        :columns="columnsItems"
        :tableRef="tableRef2?.getTableRef()"
        @refresh="onSearch2"
        @fullscreen="onFullscreen"
      >
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog2()"
          >
            新增
          </el-button>
        </template>
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            ref="tableRef2"
            :adaptiveConfig="{ offsetBottom: 45 }"
            align-whole="center"
            row-key="id"
            showOverflowTooltip
            table-layout="auto"
            :loading="loading"
            :size="size"
            :data="dataItemList"
            :columns="dynamicColumns"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            @page-size-change="handleSizeChange"
            @page-current-change="handleCurrentChange"
          >
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                @click="openDialog2('查看', row)"
              >
                查看
              </el-button>
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog2('修改', row)"
              >
                修改
              </el-button>

              <el-popconfirm
                :title="`是否确认删除部这条数据`"
                @confirm="handleDelete2(row)"
              >
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="primary"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-table__inner-wrapper::before) {
  height: 0;
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
