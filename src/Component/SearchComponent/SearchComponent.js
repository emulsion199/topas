import {useState} from 'react'
import axios from 'axios'
import FinanceCard from './FinanceCard'
const SearchComponent=()=>
{
    const [searchInput,set_searchInput]=useState("")
    //axios.get("http://localhost:5000/update_name").then((response)=>{console.log(response.data)})
    const finance_name_json=require('../../json_data/finance_name.json')
    const reverse_dict={}
    const finance_list=[]
    const price_list=[[],[],[],[],[]]
    const col={0:'시가',1:'고가',2:'저가',3:'종가',4:'거래량'}
    const [price,setprice]=useState([])
    const ticker=Object.keys(finance_name_json)
    for (var i=0;i<ticker.length;i++)
    {
        finance_list.push(finance_name_json[ticker[i]])
        reverse_dict[finance_name_json[ticker[i]]]=ticker[i]
    }
    finance_list.sort()

    const getPrice=(ticker)=>
    {
        axios.post("http://localhost:5000/price",{'ticker':String(ticker)}).then((response)=>{
        
        const price_date=Object.keys(response.data)
        for (var i=0;i<price_date.length;i++)
        {
            for (var j=0;j<5;j++)
            {
                price_list[j].push(response.data[price_date[i]][col[j]])
            }
        }
        setprice(price_list)
        console.log(price)
    })
    }
    return (
        <div>
            <input value={searchInput} onChange={(e)=>set_searchInput(e.target.value)}></input>
            <button>검색하기</button>
            <div style={{
                background:'lightgray',
                overflowY:'auto',
                height:'500px',
                width:'300px',
            }}>
                {finance_list.map((fname,key)=>{
                    if(fname.indexOf(searchInput)!=-1){
                    return(
                        <div onClick={()=>{getPrice(reverse_dict[fname])}}>
                        <FinanceCard key={fname} name={fname} ></FinanceCard>
                        </div>
                    )
                    }
                })}
                
            </div>
            <div>
                {price.map((a,index)=><div>{col[index]+' '+a+' '}</div>)}

            </div>

        </div>
    )
}
export default SearchComponent