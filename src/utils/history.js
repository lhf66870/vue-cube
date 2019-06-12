const History = {
    _history: [], //历史记录堆栈
    install(Vue){
        Object.defineProperty(Vue.prototype, "$routerHistory", {
            get(){
                return History
            }
        })
    },
    push(path){
        this._history.push(path)
    },
    pop(){
        this._history.pop()
    },
    //判断是否可后退
    canBack(){
        return this._history.length > 0
    }
}
export default History