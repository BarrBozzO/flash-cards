import { useSelector, TypedUseSelectorHook } from "react-redux";
import { StoreData } from "store/types";

const useTypedSelector: TypedUseSelectorHook<StoreData> = useSelector;

export default useTypedSelector;
