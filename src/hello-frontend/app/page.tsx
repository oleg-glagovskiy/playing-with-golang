import { revalidatePath } from "next/cache";
import { Key } from "react";
require('dotenv').config()

const url = process.env.HELLO_BACKEND_URL!

async function getData() {

  console.log(`trying to get from ${url}`)

  const res = await fetch(url, { cache: 'no-store' })
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

async function addData(formData: FormData) {
  const res = await fetch(`${url}/add`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    throw new Error('Failed to add data')
  }
}

async function addName(data: FormData) {
  'use server'
  let formData = new FormData()
  console.log(data)
  formData.append("name", data.get("name")!)
  console.log(formData)
  await addData(formData)
  revalidatePath("/")
}

export default async function Page() {
  const data = await getData()

  return (
    <>     
      <div className="flex mb-4">
        <div className="w-1/4 h-13">
          <div className="px-6 py-4 font-bold text-xl mb">Hello...</div>
          {data.map((item: { name: string; }, index: Key) => (
            <div key={index} className="px-20 py-1 font-bold text-m mb">...{item.name}</div>
          ))}
        </div>
        <div className="w-1/4 h-12">
          <form className="px-6 w-full max-w-sm" action={addName}>
            <div className="flex items-center border-b border-teal-500 py-2">
              <input className="appearance-none bg-white-100 border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Your Name" aria-label="Your Name" name="name"></input>
              <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                Add Me To List
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}