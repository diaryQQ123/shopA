import { createStore } from "vuex";
import number from "@/store/state/num.state.js"
import uinfo from "@/store/state/uinfo.state.js"
const useStore = createStore({
  modules:{
    number,
    uinfo,
  },
});

export default useStore;
