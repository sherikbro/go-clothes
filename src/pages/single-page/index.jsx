import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { products } from '@service';
const Index = () => {
    const {id} = useParams()
    console.log(id, "useparams");


    const [datas, setDatas] = useState([]);
    const getData = async () => {
        const response = await products.get_by_id(id);
        if (response.status == 200) {
            setDatas(response?.data);
        }
    }
  useEffect(() => {
    getData();
  }, []);
  console.log(datas,"datas");
  return (
    <div className=' w-full h-[93vh] flex justify-center items-center'>
        <div className='w-[600px] h-[600px]  flex flex-col  items-start py-[30px] gap-[15px]'>
            <h1 className='text-[25px] text-center w-full font-semibold text-[darkblue] pb-[20px]'>{datas.product_name}</h1>
            <span className='flex gap-5'>
                <p className='text-[20px] font-semibold text-[darkblue]'>Description:</p>
                <p>{datas.description}</p>
            </span>
            <span className='flex gap-5 items-center'>
                <p className='text-[20px] font-semibold text-[darkblue]'>Made in:</p>
                <p>{datas.made_in}</p>
            </span>
            <span className='flex gap-5 items-center'>
                <p className='text-[20px] font-semibold text-[darkblue]'>Color:</p>
                <p>{datas.color}</p>
            </span>
            <span className='flex gap-5 items-center'>
                <p className='text-[20px] font-semibold text-[darkblue]'>Size:</p>
                <p>{datas.size}</p>
            </span>
            <span className='flex gap-5 items-center'>
                <p className='text-[20px] font-semibold text-[darkblue]'>Count:</p>
                <p>{datas.count}</p>
            </span>
            <span className='flex gap-5 items-center'>
                <p className='text-[20px] font-semibold text-[darkblue]'>Cost:</p>
                <p>{datas.cost}$</p>
            </span>
            <span className='flex gap-5 items-center'>
                <p className='text-[20px] font-semibold text-[darkblue]'>Discount:</p>
                <p>{datas.discount}%</p>
            </span>
            <span className='flex gap-5 items-center'>
                <p className='text-[20px] font-semibold text-[darkblue]'>Age Range:</p>
                <p>{datas.age_min}-{datas.age_max}</p>
            </span>
            <span className='flex gap-5 items-center'>
                <p className='text-[20px] font-semibold text-[darkblue]'>For Gender:</p>
                <p>{datas.for_gender}</p>
            </span>
        </div>
    </div>
  )
}

export default Index
