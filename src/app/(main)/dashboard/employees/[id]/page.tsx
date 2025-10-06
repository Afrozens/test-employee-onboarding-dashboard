import ContainerEmployee from "@/components/dashboard/ContainerEmployee";

interface Props {
  params: { id: string };
}

const EmployeePage = async ({ params: { id } }: Props) => {
  return (
    <section className="w-full min-h-screen p-4">
        <ContainerEmployee id={id} />
    </section>
  )
}

export default EmployeePage
