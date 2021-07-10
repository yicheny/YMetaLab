import {ICharacterInfo} from "../../components/CharacterInfo";
import ReactEcharts from "echarts-for-react";
import {useMemo} from "react";

interface ICard{
    data?:ICharacterInfo
}
export default function Card(props:ICard){
    return <ReactEcharts option={useOption(props.data)} style={{width:800,marginTop:60,height:560}}/>
}

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
                    { name: `力量${data?.power}`, max: 100},
                    { name: `防御${data?.defense}`, max: 100},
                    { name: `幸运${data?.lucky}`, max: 100},
                    { name: `技术${data?.technology}`, max: 100},
                    { name: `速度${data?.speed}`, max: 100},
                ],
            },
            series: [{
                type: 'radar',
                data: [
                    {
                        name: `角色-${data?.name}`,
                        value: [
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
