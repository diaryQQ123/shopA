export default{
    namespaced: true,
    state() {
        return {
            userinfo:(localStorage.getItem("localdata")&&JSON.parse(localStorage.getItem("localdata")))||{} // 这里需要冒号
        };
    },
    mutations:{
        setuinfo(state,uinfo){
            state.userinfo=uinfo
        }
    }
}