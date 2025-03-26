import dayjs from "dayjs";
import editForm from "../form.vue";
import editForm2 from "../form2.vue";
import { message } from "@/utils/message";
import {
  getDictList,
  getDictDataList,
  addDict,
  addDictData,
  deleteDict,
  deleteDictData,
  updateDict,
  updateDictData
} from "@/api/systemMgt/dict";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { reactive, ref, onMounted, h } from "vue";
import type { FormItemProps, FormItemProps2 } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { isAllEmpty, deviceDetection } from "@pureadmin/utils";
import { toRaw } from "vue";

export function useDept() {
  const form = reactive({
    dictName: "",
    dictType: "",
    status: null,
    createTime: [],
    pageSize: 10,
    pageNum: 1
  });

  const formItem = reactive({
    dictType: "",
    dictLabel: "",
    createTime: [],
    pageSize: 10,
    pageNum: 1
  });

  const dictType = ref("");
  const formRef = ref();
  const dataList = ref([]);
  const dataItemList = ref([]);
  const loading = ref(true);
  const { tagReverseStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "字典编号",
      prop: "dictId",
      width: 80,
      align: "left"
    },
    {
      label: "字典名称",
      prop: "dictName",
      minWidth: 70
    },
    {
      label: "字典类型",
      prop: "dictType",
      minWidth: 100
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 80,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagReverseStyle.value(row.status)}>
          {row.status === 1 ? "冻结" : "正常"}
        </el-tag>
      )
    },
    {
      label: "备注",
      prop: "remark",
      width: 200
    },
    {
      label: "创建时间",
      minWidth: 150,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  const columnsItems: TableColumnList = [
    {
      label: "字典编码",
      prop: "dictCode",
      width: 80,
      align: "left"
    },
    {
      label: "字典标签",
      prop: "dictLabel",
      minWidth: 70
    },
    {
      label: "字典键值",
      prop: "dictValue",
      minWidth: 70
    },
    {
      label: "字典排序",
      prop: "dictSort",
      minWidth: 70
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 70,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagReverseStyle.value(row.status)}>
          {row.status === 1 ? "冻结" : "正常"}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      prop: "createdTime",
      minWidth: 100
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getDictList(toRaw(form));
    let newData = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;
    if (!isAllEmpty(form.dictName)) {
      // 前端搜索字典名称
      newData = newData.filter(item => item.dictName.includes(form.dictName));
    }
    if (!isAllEmpty(form.status)) {
      // 前端搜索状态
      newData = newData.filter(item => item.status === form.status);
    }
    // dataList.value = handleTree(newData); // 处理成树结构
    dataList.value = newData;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function onSearch2() {
    loading.value = true;
    const { data } = await getDictDataList({
      ...toRaw(formItem),
      dictType: dictType.value
    });
    let newData = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;
    if (!isAllEmpty(formItem.dictLabel)) {
      // 前端搜索字典标签
      newData = newData.filter(item => item.dictName.includes(form.dictName));
    }
    // dataList.value = handleTree(newData); // 处理成树结构
    dataItemList.value = newData;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}字典`,
      props: {
        formInline: {
          dictName: row?.dictName ?? "",
          dictType: row?.dictType ?? "",
          status: row?.status ?? 0,
          remark: row?.remark ?? "",
          readonly: title === "查看"
        }
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              addDict(curData).then(res => {
                if (res.success) {
                  chores();
                }
              });
            } else {
              updateDict({ ...curData, dictId: row.dictId }).then(res => {
                if (res.success) {
                  chores();
                }
              });
            }
          }
        });
      }
    });
  }

  function openDialog2(title = "新增", row?: FormItemProps2) {
    addDialog({
      title: `${title}字典数据`,
      props: {
        formInline: {
          dictLabel: row?.dictLabel ?? "",
          dictValue: row?.dictValue ?? "",
          status: row?.status ?? 0,
          readonly: title === "查看"
        }
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm2, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch2(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              addDictData({ ...curData, dictType: dictType.value }).then(
                res => {
                  if (res.success) {
                    chores();
                  }
                }
              );
            } else {
              updateDictData({
                ...curData,
                dictType: dictType.value,
                dictCode: row.dictCode
              }).then(res => {
                if (res.success) {
                  chores();
                }
              });
            }
          }
        });
      }
    });
  }

  function handleDelete(row) {
    deleteDict(row.dictId).then(res => {
      if (res.success) {
        message(`成功删除`, { type: "success" });
        onSearch();
      }
    });
  }

  function handleDelete2(row) {
    deleteDictData(row.dictCode).then(async res => {
      if (res.success) {
        message(`成功删除`, {
          type: "success"
        });
        const res = await getDictDataList({ dictType: row.dictType });
        dataItemList.value = res.data.list;
      }
    });
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
    form.pageSize = val;
    onSearch();
  }

  async function handleSizeChange2(val: number) {
    console.log(`${val} items per page`);
    formItem.pageSize = val;
    const res = await getDictDataList(formItem);
    dataItemList.value = res.data.list;
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
    form.pageNum = val;
    onSearch();
  }

  async function handleCurrentChange2(val: number) {
    console.log(`current page: ${val}`);
    formItem.pageNum = val;
    onSearch2();
  }

  async function handleRowClick(row) {
    console.log("handleRowClick", row);
    dictType.value = row.dictType;
    onSearch2();
  }
  onMounted(() => {
    onSearch();
  });

  return {
    form,
    formItem,
    loading,
    columns,
    columnsItems,
    dataList,
    dataItemList,
    /** 搜索 */
    onSearch,
    onSearch2,
    /** 重置 */
    resetForm,
    /** 新增、修改字典 */
    openDialog,
    /** 新增、修改字典数据 */
    openDialog2,
    /** 删除字典 */
    handleDelete,
    handleDelete2,
    handleSizeChange,
    handleSizeChange2,
    handleCurrentChange,
    handleCurrentChange2,
    handleRowClick
  };
}
