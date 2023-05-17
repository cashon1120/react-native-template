interface GlobalProps {
  token: string | null;
  userInfo: any;
}
const global: GlobalProps = {
  token: '',
  userInfo: {},
};

export default global;
