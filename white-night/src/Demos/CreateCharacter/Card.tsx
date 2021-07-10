import {ICharacterInfo} from "../../components/CharacterInfo";
import ReactEcharts from "echarts-for-react";
import {useMemo} from "react";

interface ICard{
    data?:ICharacterInfo
}
export default function Card(props:ICard){
    return <ReactEcharts option={useOption(props.data)} style={{width:800,marginTop:60,height:560}}/>
}

const max = 30;
function useOption(data?:ICharacterInfo){
    return useMemo(()=>{
        return {
            legend: {
                data: [`角色-${data?.name}`]
            },
            color:[
                '#1E90FF'
            ],
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: `生命值${data?.hp}`, max:max*2},
                    { name: `力量${data?.power}`, max},
                    { name: `防御${data?.defense}`, max},
                    { name: `幸运${data?.lucky}`, max},
                    { name: `技术${data?.technology}`, max},
                    { name: `速度${data?.speed}`, max},
                ],
            },
            series: [{
                type: 'radar',
                data: [
                    {
                        name: `角色-${data?.name}`,
                        value: [
                            data?.hp,
                            data?.power,
                            data?.defense,
                            data?.lucky,
                            data?.technology,
                            data?.speed
                        ],
                        areaStyle:{
                            color:"rgba(30,144,255,0.32)"
                        }
                    },
                ]
            }]
        };
    },[data])
}
