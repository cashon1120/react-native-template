import {useNavigation as useNav} from '@react-navigation/native';
import {RootStackNavigation} from '@/routes/index';

const useNavigation = () => {
  return useNav<RootStackNavigation>();
};

export default useNavigation;
