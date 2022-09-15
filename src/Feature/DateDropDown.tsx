import { Button, Dropdown, Menu } from 'antd'
import { useEffect, useState } from 'react';

const items = [
    {key:"1",label:'January'},
    {key:"2",label:'February'},
    {key:"3",label:'March'},
    {key:"4",label:'April'},
    {key:"5",label:'May'},
    {key:"6",label:'June'},
    {key:"7",label:'July'},
    {key:"8",label:'August'},
    {key:"9",label:'September'},
    {key:"10",label:'October'},
    {key:"11",label:'November'},
    {key:"12",label:'December'},

]

const timeElapsed = Date.now();
const date = new Date(timeElapsed);
const monthNow = date.getMonth()


export const DateDropDown = () => {
    const [activeKey, setActiveKey] = useState<string>(monthNow.toString())
    const [activeLabel, setActiveLabel] = useState<string>()

    useEffect(() => {
        const defaultLabel = items.find((element)=>element['key']===activeKey)
        setActiveLabel(defaultLabel?.label)
    }, [activeKey])
    

    const menu = 
    (<Menu 
        onClick = {(e)=>{
            setActiveKey(e.key)
        }}
        items={items}
        selectedKeys={[activeKey]}
    />)

    return (
        <Dropdown overlay={menu}>
            <Button size='small'>{activeLabel}</Button>
        </Dropdown>
    )
}

export const useDateSelected = {}
