/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Grid, {GridItem} from './Grid';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import Text from './Text';
import http from '@/utils/http';
import {UploadProps} from './types';

let key = 0;

interface Item {
  key: number;
  uri?: string;
  uploadUrl?: string;
  loading?: boolean;
}

const getValue = (uploadedData: Item[]): any => {
  const result: string[] = [];
  uploadedData.forEach((item: Item) => {
    if (item.uploadUrl) {
      result.push(item.uploadUrl);
    }
  });
  return result;
};

const Upload = (props: UploadProps) => {
  const {max = 1, defaultValue, onChange} = props;
  const [data, setData] = useState<Item[]>([]);
  const [boxSize, setBoxSize] = useState<number | string>('100%');
  const onLayout = (width: number) => setBoxSize(width);

  const onSelect = async (index: number) => {
    const result: any = await launchImageLibrary({
      mediaType: 'mixed',
    });
    if (result.didCancel) {
      return;
    }
    const {uri, fileName} = result.assets[0];
    data[index].uri = uri;
    data[index].loading = true;
    if (data.length < max && data[data.length - 1].uri) {
      key++;
      data.push({key});
    }
    setData([...data]);
    const formData = new FormData();
    const file = {
      uri,
      type: 'application/octet-stream',
      name: fileName,
    };
    formData.append('file', file);
    http
      .request({
        url: 'api/v1.0/workOrderInfo/upload',
        params: {fileFormData: formData},
      })
      .then(res => {
        if (res.errorCode !== 0) {
          return;
        }
        data[index].uploadUrl = res.result;
        setData([...data]);
        onChange(getValue(data));
      })
      .finally(() => {
        data[index].loading = false;
        setData([...data]);
      });
  };
  useEffect(() => {
    if (defaultValue) {
      if (typeof defaultValue === 'string') {
        setData([{uri: defaultValue, key}]);
      } else {
        const _data: Item[] = [];
        defaultValue.forEach((item: string) => {
          key++;
          _data.push({uri: item, key});
        });
        setData(_data);
      }
    } else {
      setData([{uri: '', key}]);
    }
  }, []);

  const handleDelete = (deleteKey: number) => {
    data.forEach((item: Item, index: number) => {
      if (item.key === deleteKey) {
        data.splice(index, 1);
      }
    });
    if (data.length === 0) {
      key++;
      data[0] = {uri: '', key};
    }
    if (data.length < max && data[data.length - 1].uri) {
      data.push({key: key++});
    }
    setData([...data]);
  };

  return (
    <Grid
      square
      row={4}
      xSpace={10}
      ySpace={10}
      style={styles.wrapper}
      onLayout={onLayout}>
      {data.map((item: Item, index: number) => (
        <GridItem key={item.key}>
          <TouchableOpacity
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => onSelect(index)}>
            <View style={styles.upload}>
              {item.uri ? (
                <TouchableOpacity
                  style={styles.delete}
                  onPress={() => handleDelete(item.key)}>
                  <Icon name="trash-outline" size={14} color="#999" />
                </TouchableOpacity>
              ) : null}

              {item.uri ? (
                <Image
                  source={{uri: item.uri}}
                  style={{width: boxSize, height: boxSize}}
                  resizeMode="cover"
                />
              ) : (
                <>
                  <Icon name="add-outline" size={35} color="#999" />
                  <Text size={10} style={{marginTop: -4}} color="#999">
                    添加图片
                  </Text>
                </>
              )}
              {item.loading ? (
                <View style={styles.loading}>
                  <ActivityIndicator size="small" color="#999" />
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Upload;
const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  upload: {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: '#fff',
    borderStyle: 'dashed',
    borderColor: '#BFBFBF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    position: 'absolute',
    top: 1,
    right: 1,
    zIndex: 100,
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 2,
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
