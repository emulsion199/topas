import {useState} from 'react'
import axios from 'axios'
import FinanceCard from './FinanceCard'
const SearchComponent=()=>
{
    const [searchInput,set_searchInput]=useState("")
    //axios.get("http://localhost:5000/update_name").then((response)=>{console.log(response.data)})
    const finance_name_json=require('../../json_data/finance_name.json')
    const finance_list=[]
    const ticker=Object.keys(finance_name_json)
    for (var i=0;i<ticker.length;i++)
    {
        finance_list.push(finance_name_json[ticker[i]])
    }
    finance_list.sort()
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
                        
                        <FinanceCard key={fname} name={fname}></FinanceCard>
                    )
                    }
                })}
                
            </div>

        </div>
    )
}
export default SearchComponent