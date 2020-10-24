import useTypedSelector from "./useTypedSelector";

function useAuth() {
  const auth = useTypedSelector(state => state.auth.data);

  return {
    id: auth.id,
    isAuthenticated: Boolean(auth.token)
  };
}

export default useAuth;
