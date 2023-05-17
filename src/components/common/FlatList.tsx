import React, {useState, useRef, useImperativeHandle, forwardRef} from 'react';
import {View, FlatList, ListRenderItem} from 'react-native';
import {
  renderLoading,
  renderEnd,
  renderMore,
  renderRefresh,
} from './FlatListItem';
import NoData from './NoData';
import http from '@/utils/http';

/**
 * interface Props
 * @param url 接口请求地址
 * @param httpMethod 接口请求方式 'POST' | 'GET' | 'PATCH'
 * @param renderItem 渲染列表方法, 从返回的 item 字段里拿数据
 * @param pageSize 每页数据条数
 * @param headerComponent 头部显示内容
 * @param params 自定义参数
 * @param listKey 接口返回数据后的列表字段, 默认可能是dataList, 但也可能不是, 需要手动传入
 * @param formatResultData 格式化拿到的数据
 * @param onDataLoaded 拿到数据后事件回调
 */
interface Props {
  url: string;
  httpMethod?: 'POST' | 'GET' | 'PATCH';
  itemKey: string;
  renderItem: ListRenderItem<any>;
  pageSize?: number;
  headerComponent?: React.ReactElement;
  params?: {
    [key: string]: number | string;
  };
  listKey?: string;
  formatResultData?: (data: any[]) => any[];
  onDataLoaded?: (data: any[]) => void;
}

const MyFlatList = (props: Props, ref: any) => {
  const {
    url,
    itemKey,
    params,
    httpMethod = 'POST',
    listKey = 'dataList',
    onDataLoaded,
    headerComponent,
    renderItem,
    formatResultData,
    pageSize = 10,
  } = props;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<any>([]);
  const freshingFlag = useRef(false);
  const currentPage = useRef(1);
  const loadFlag = useRef(false);

  useImperativeHandle(ref, () => {
    return {
      // 重新加载数据
      loadData,
      // 更新某条数据
      updateData,
      // 删除某条数据
      deleteData,
      // 获取所有数据
      getAllData,
      // 更新所有数据
      updateAllData,
    };
  });

  const getAllData = () => {
    return data;
  };

  const updateAllData = (newData: any) => {
    setData(newData);
  };

  const updateData = (item: any) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i][itemKey] === item[itemKey]) {
        data[i] = item;
        break;
      }
    }
    setData([...data]);
  };

  const deleteData = (item: any) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i][itemKey] === item[itemKey]) {
        data.splice(i, 1);
        break;
      }
    }
    setData([...data]);
  };

  const initParams = () => {
    currentPage.current = 1;
    setData([]);
    setLoaded(false);
    setLoading(true);
    setNoMore(false);
    loadFlag.current = false;
  };

  const loadData = () => {
    initParams();
    getData();
  };

  const scrollToEnd = () => {
    if (!noMore && loadFlag.current) {
      currentPage.current = currentPage.current + 1;
      loadFlag.current = false;
      getData();
    }
  };

  const handleOnRefresh = () => {
    if (freshingFlag.current) {
      return;
    }
    freshingFlag.current = true;
    initParams();
    setRefreshing(true);
    getData();
  };

  const getData = () => {
    setLoading(true);
    let httpUrl = url;
    http
      .request({
        url: httpUrl,
        method: httpMethod,
        params: {
          page: currentPage.current,
          pageSize,
          ...params,
        },
      })
      .then(res => {
        onDataLoaded && onDataLoaded(res.result);
        if (res.errorCode !== 0) {
          return;
        }
        let dataList =
          listKey === 'useResult' ? res.result : res.result[listKey];
        // 拿到数据后看是否需要对数据进行处理(如获取图片，添加key等等)
        if (formatResultData) {
          dataList = formatResultData(dataList);
        }
        setData((oldData: any[]) => [...oldData, ...dataList]);
        setNoMore(dataList.length < 10);
      })
      .finally(() => {
        setTimeout(
          () => {
            loadFlag.current = true;
            freshingFlag.current = false;
          },
          freshingFlag.current ? 200 : 0,
        );
        setRefreshing(false);
        setLoaded(true);
        setLoading(false);
      });
  };

  return (
    <>
      <View style={{height: '100%'}}>
        <FlatList
          keyboardDismissMode="on-drag"
          data={data}
          onRefresh={handleOnRefresh}
          renderItem={renderItem}
          refreshing={refreshing}
          onEndReached={scrollToEnd}
          onEndReachedThreshold={0.01}
          ListHeaderComponent={data.length > 0 ? headerComponent : null}
          ListFooterComponent={
            data.length === 0 && loaded ? (
              <NoData />
            ) : noMore ? (
              renderEnd()
            ) : refreshing ? (
              renderRefresh()
            ) : loading ? (
              renderLoading()
            ) : (
              renderMore()
            )
          }
          keyExtractor={item => item[itemKey]}
        />
      </View>
      {/* <Loading visible={loading} /> */}
    </>
  );
};

export default forwardRef(MyFlatList);
