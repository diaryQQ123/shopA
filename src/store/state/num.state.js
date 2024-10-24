export default{
    namespaced:true,
    state() {
        return{
            count:1
        }
      },
      mutations: {
        setcount(state,num){
            state.count=num
        }
      },
      actions: {
        setcountPromise(context,num){
            return new Promise((resolve,reject)=>{
                if(num>100){
                    reject("请输入小于100的数")
                }else{
                    context.commit("setcount",num)
                    resolve()
                }
            })
        }
      },
      getters: {
        setcountStatus(state){
            return state.count>=99
        }
      },
}