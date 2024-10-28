import { getErrorMsg } from "@/utils/error";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

/**
 * 修改，移除，监听 localStorage
 * @param key localStorage 里面的key
 * @param callback 回调
 * @returns value 值
 * remove： 移除
 * dispatchStorageListener: 触发 storage 修改事件，需要触发这个才能让事件监听到
 *
 */
function useLocalStorageListener<T>(
  key: string,
  type: string,
  callback?: (newValue: T) => void
) {
  const [value, setValue, remove] = useLocalStorage<T>(key);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        let newValue = event.newValue;
        if (type === "object" || type === "array") {
          try {
            // 没有传 newValue 则置空
            newValue = JSON.parse(
              event.newValue ? event.newValue : type === "array" ? "[]" : "{}"
            );
          } catch (err) {
            console.log(getErrorMsg(err));
          }
        }
        setValue(newValue as T);
        callback && callback(newValue as T);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, callback, setValue]);

  // 触发事件
  const dispatchStorageListener = (newValue: string) => {
    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
        newValue,
      })
    );
  };

  return { value, remove, dispatchStorageListener };
}

export default useLocalStorageListener;
