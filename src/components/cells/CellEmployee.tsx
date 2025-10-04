'use client';

import { MailOutlined, ShopOutlined } from "@ant-design/icons";
import Link from "next/link";

import { Employee } from "@/models/employee";
import AvatarGenerate from "../dashboard/AvatarGenerate";

interface Props {
    record: Employee;
}

const CellEmployee = ({ record }: Props) => {
  return (
    <div
      className={`flex w-full items-center justify-start gap-1 truncate`}
    >
      <div className="flex w-full items-center justify-start">
        <div className="w-19 relative">
          <AvatarGenerate
            name={record.name}
            size={50}
          />
        </div>
        <div className="relative ml-4 mb-auto flex w-fit flex-col justify-start capitalize">
          <div className='w-full flex flex-row-reverse gap-2 items-start justify-end'>
          <Link
            href={`/dashboard/employee/${record.id}`}
            className="text-[13px] hover:text-primary-01 font-semibold transition-all hover:opacity-80"
          >
            {record.name} 
          </Link>
          </div>
              <span className="text-[13px] lowercase font-light mb-1 flex items-center gap-2">
                <MailOutlined className="text-base" />
                {record.email}
              </span>
              <span className="text-xs capitalize font-light mb-1 flex items-cencer gap-2">
                <ShopOutlined className="text-lg" />
                {record.departament}
              </span>
        </div>
      </div>
    </div>
  )
}

export default CellEmployee
