import formApp from "./formApp";

describe('reducer',()=>{
    it('初始状态测试',()=>{
        expect(formApp(undefined,{})).toEqual({
            id:0,
            data:[]
        })
    })

    it('UPDATE_ID',()=>{
        expect(formApp(undefined,{type:"UPDATE_ID",id:1}).id).toBe(1)
    })

    it("ADD_DATA",()=>{
        expect(formApp(undefined,{type:"ADD_DATA",data:[1,2,3]}).data).toEqual([1,2,3])
    })

    it("UPDATE_DATA",()=>{
        expect(formApp({data:[1,2,3]},{type:"UPDATE_DATA",value:10,index:2}).data).toEqual([1,2,10])
    })
})
