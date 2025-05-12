import "./reset.css";
import editForm from "../form/index.vue";
import editForm2 from "../form/index2.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { PaginationProps } from "@pureadmin/table";
import type { FormItemProps } from "../utils/types";
import { getKeyList, deviceDetection } from "@pureadmin/utils";
import {
  getCarouselList,
  getCarouselItemList,
  addCarousel,
  addCarouselItem,
  updateCarousel,
  updateCarouselItem,
  deleteCarousel,
  deleteCarouselItem
} from "@/api/articleMgt/carousel";
// import { ElMessageBox } from "element-plus";
import { type Ref, h, ref, toRaw, computed, reactive, onMounted } from "vue";

export function useArticleMgt(tableRef: Ref) {
  const form = reactive({
    carouselName: "",
    pageSize: 10,
    pageNum: 1
  });
  const form2 = reactive({
    name: "",
    pageSize: 10,
    pageNum: 1
  });
  const carouselId = ref("");
  const formRef = ref();
  const formRef2 = ref();
  const dataList = ref([]);
  const dataItemList = ref([]);
  const loading = ref(true);
  // 上传头像信息
  const treeData = ref([]);
  const treeLoading = ref(true);
  const selectedNum = ref(0);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "轮播图名称",
      prop: "carouselName",
      width: 200
    },
    {
      label: "轮播图描述",
      prop: "carouselDesc",
      width: 200
    },
    {
      label: "轮播图位置",
      prop: "positionName",
      width: 100
    },
    {
      label: "操作",
      fixed: "right",
      minWidth: 200,
      slot: "operation"
    }
  ];
  const columnsItem: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "轮播图片",
      prop: "imageUrl",
      cellRenderer: ({ row }) => (
        <el-image
          fit="cover"
          preview-teleported={true}
          src={row.imageUrl}
          preview-src-list={Array.of(row.imageUrl)}
          class="w-[24px] h-[24px] rounded-full align-middle"
        />
      ),
      width: 90
    },
    {
      label: "跳转类型",
      prop: "jumpType",
      width: 90
    },
    {
      label: "类型内容",
      prop: "keyWord",
      minWidth: 100
    },
    {
      label: "排序",
      prop: "sort",
      minWidth: 100
    },
    {
      label: "操作",
      fixed: "right",
      width: 200,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });

  function handleUpdate(row) {
    console.log(row);
  }

  async function handleDelete(row) {
    await deleteCarousel(row.carouselId);
    message(`您成功删除了编号为${row.carouselId}的这条数据`, {
      type: "success"
    });
    onSearch();
  }

  async function handleDelete2(row) {
    console.log("handleDelete2", row);
    await deleteCarouselItem(row.carouselItemId);
    message(`您成功删除了编号为${row.carouselId}的这条数据`, {
      type: "success"
    });
    onSearch2();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  /** 取消选择 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空用户的选择
    tableRef.value.getTableRef().clearSelection();
  }

  /** 批量删除 */
  function onbatchDel() {
    // 返回当前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();
    // 接下来根据实际业务，通过选中行的某项数据，比如下面的id，调用接口进行批量删除
    message(`已删除编号为 ${getKeyList(curSelected, "id")} 的数据`, {
      type: "success"
    });
    tableRef.value.getTableRef().clearSelection();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getCarouselList(toRaw(form));
    dataList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function onSearch2() {
    loading.value = true;
    const { data } = await getCarouselItemList({
      ...toRaw(form2),
      carouselId: carouselId.value
    });
    dataItemList.value = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}轮播图`,
      props: {
        formInline: {
          title: row?.title ?? "",
          cover: row?.cover ?? "",
          content: row?.content ?? "",
          author: row?.author ?? "",
          status: row?.status ?? 1,
          readonly: title === "查看" ? true : false
        }
      },
      width: "46%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        console.log("beforeSure", options);
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您成功${title}了这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(async valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              addCarousel(curData).then(res => {
                if (res.success) {
                  // 实际开发先调用新增接口，再进行下面操作
                  chores();
                }
              });
            } else {
              await updateCarousel({ ...curData, id: row?.id });
              // 实际开发先调用修改接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  function openDialog2(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}轮播图项`,
      props: {
        formInline: {
          title: row?.title ?? "",
          jumpType: row?.jumpType ?? "1",
          imageUrl: row?.imageUrl ?? "",
          keyWord: row?.keyWord ?? ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm2, { ref: formRef2, formInline: null }),
      beforeSure: (done, { options }) => {
        console.log("beforeSure", options);
        const FormRef = formRef2.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您成功${title}了这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch2(); // 刷新表格数据
        }
        FormRef.validate(async valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              addCarouselItem({
                ...curData,
                carouselId: carouselId.value
              }).then(res => {
                if (res.success) {
                  // 实际开发先调用新增接口，再进行下面操作
                  chores();
                }
              });
            } else {
              await updateCarouselItem({
                ...curData,
                carouselItemId: row?.carouselItemId
              });
              // 实际开发先调用修改接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  async function handleRowClick(row) {
    console.log("handleRowClick", row);
    carouselId.value = row.carouselId;
    onSearch2();
  }

  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    columnsItem,
    dataList,
    dataItemList,
    treeData,
    treeLoading,
    selectedNum,
    pagination,
    buttonClass,
    carouselId,
    deviceDetection,
    onSearch,
    resetForm,
    onbatchDel,
    openDialog,
    openDialog2,
    handleUpdate,
    handleDelete,
    handleDelete2,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleRowClick
  };
}
