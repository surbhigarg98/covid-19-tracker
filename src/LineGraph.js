import React,{useEffect, useState} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from 'numeral'
import './LineGraph.css'

const options={
    legend:{
        display:false
    },
    elements:{
        point:{
            radius:0
        }
    },
    maintainAspectRatio:false,
    tooltips:{
        mode:'index',
        intersect:false,
        callbacks:{
            label: function(tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    },
    scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    format:"MM/DD//YY",
                    tooltipFormat:"ll"
                }
            }
        ],
        yAxes:[
            {
                gridLines:{
                    dispaly:false
                },
                ticks:{
                    callback:function(value,index,values){
                        return numeral(value).format("0a")
                    }
                }
            }
        ]
    }
}
function LineGraph() {
    const [data,setData] = useState({})

    const buildChartData =(data,casesType = 'cases')=>{
        const chartData =[];
        let lastDataPoint;
        for(let date in data.cases){
            if(lastDataPoint){
                const newDataPoint = {
                    x:date,
                    y:data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date]
        }
        return chartData;
    }

    useEffect(()=>{
    const getData = async() =>{
    await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    .then(response=>response.json())
    .then(data=>{
        const chartData = buildChartData(data)
        setData(chartData)
        console.log(data)
    })
    }
    getData()
    },[])

    return (
        <div className="linegraph">
            {data?.length>0 && (
                <Line 
                options={options}
                data={{
                    datasets:[{
                        backgroundColor:"rgba(204,16,52,0.7)",
                        borderColor:"#CC1034",
                        data:data
                    }]
                }}
                />
            )}
        </div>
    )
}

export default LineGraph
