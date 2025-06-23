import CloseToast from "@/components/global/CloseToast";
import { useEffect } from "react";
import { toast } from "sonner";


export function useFeedBackToast(state: any) {

  useEffect(() => {
    if (!state.success && state.message) {
      toast.error(state.message, { action: <CloseToast /> })
    }

    if (state.success && state.message) {
      toast.success(state.message, { action: <CloseToast /> })
    }
  }, [state])

}